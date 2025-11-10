// backend/src/websocket.ts
import WebSocket, { WebSocketServer } from 'ws';
import { Server } from 'http';

let wss: WebSocketServer;

// Lưu trữ client với userId
interface ClientMetadata {
    userId?: number;
}

// Map để lưu thông tin client
const clients = new Map<WebSocket, ClientMetadata>();

// 🚀 ROOM-BASED ARCHITECTURE - Hiệu suất cao
// Key: tripId, Value: Set of WebSocket clients đang theo dõi chuyến đó
const tripRooms = new Map<number, Set<WebSocket>>();

// Map ngược: từ WebSocket -> Set of tripIds đang theo dõi (để dễ cleanup)
const clientTrips = new Map<WebSocket, Set<number>>();

export const initWebSocket = (server: Server) => {
    wss = new WebSocketServer({ server });

    console.log('🚀 WebSocket Server is running (Room-based)');

    wss.on('connection', (ws) => {
        console.log('✅ Client connected');
        clients.set(ws, {});
        clientTrips.set(ws, new Set());

        ws.on('message', (message) => {
            try {
                const data = JSON.parse(message.toString());

                const metadata = clients.get(ws);
                if (!metadata) return;

                // Xử lý xác thực client
                if (data.type === 'authenticate' && data.userId) {
                    metadata.userId = data.userId;
                    clients.set(ws, metadata);
                    console.log(`✅ Client authenticated as userId: ${data.userId}`);
                    
                    ws.send(JSON.stringify({ 
                        type: 'authenticated', 
                        userId: data.userId 
                    }));
                }

                // Subscribe vào room của chuyến đi - O(1) complexity
                if (data.type === 'subscribe_trip' && data.tripId) {
                    const tripId = parseInt(data.tripId);
                    
                    // Thêm client vào room của chuyến đi
                    if (!tripRooms.has(tripId)) {
                        tripRooms.set(tripId, new Set());
                    }
                    tripRooms.get(tripId)!.add(ws);
                    
                    // Lưu lại tripId vào client để dễ cleanup
                    clientTrips.get(ws)?.add(tripId);
                    
                    console.log(`👁️ Client (userId: ${metadata.userId}) joined room trip-${tripId}. Room size: ${tripRooms.get(tripId)!.size}`);
                    
                    ws.send(JSON.stringify({ 
                        type: 'subscribed', 
                        tripId: tripId 
                    }));
                }

                // Unsubscribe khỏi room - O(1) complexity
                if (data.type === 'unsubscribe_trip' && data.tripId) {
                    const tripId = parseInt(data.tripId);
                    
                    // Xóa client khỏi room
                    tripRooms.get(tripId)?.delete(ws);
                    
                    // Cleanup room nếu trống
                    if (tripRooms.get(tripId)?.size === 0) {
                        tripRooms.delete(tripId);
                        console.log(`🧹 Room trip-${tripId} deleted (empty)`);
                    }
                    
                    // Xóa khỏi danh sách trips của client
                    clientTrips.get(ws)?.delete(tripId);
                    
                    console.log(`👁️ Client (userId: ${metadata.userId}) left room trip-${tripId}`);
                    
                    ws.send(JSON.stringify({ 
                        type: 'unsubscribed', 
                        tripId: tripId 
                    }));
                }
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        });

        ws.on('close', () => {
            const metadata = clients.get(ws);
            console.log(`❌ Client disconnected${metadata?.userId ? ` (userId: ${metadata.userId})` : ''}`);
            
            // Cleanup: xóa client khỏi tất cả rooms
            const trips = clientTrips.get(ws);
            if (trips) {
                trips.forEach(tripId => {
                    tripRooms.get(tripId)?.delete(ws);
                    if (tripRooms.get(tripId)?.size === 0) {
                        tripRooms.delete(tripId);
                    }
                });
                clientTrips.delete(ws);
            }
            
            clients.delete(ws);
        });

        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
            
            // Cleanup on error
            const trips = clientTrips.get(ws);
            if (trips) {
                trips.forEach(tripId => {
                    tripRooms.get(tripId)?.delete(ws);
                    if (tripRooms.get(tripId)?.size === 0) {
                        tripRooms.delete(tripId);
                    }
                });
                clientTrips.delete(ws);
            }
            
            clients.delete(ws);
        });
    });
};

// Hàm broadcast cho tất cả clients (dùng cho admin)
export const broadcastMessage = (message: any) => {
    const messageString = JSON.stringify(message);
    let sentCount = 0;
    
    clients.forEach((metadata, client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(messageString);
            sentCount++;
        }
    });
    
    console.log(`📢 Broadcasted to ${sentCount}/${clients.size} clients`);
};

// Gửi đến một user cụ thể
export const sendMessageToUser = (userId: number, message: any) => {
    const messageString = JSON.stringify(message);
    let sentCount = 0;
    
    clients.forEach((metadata, client) => {
        if (metadata.userId === userId && client.readyState === WebSocket.OPEN) {
            client.send(messageString);
            sentCount++;
        }
    });
    
    console.log(`📨 Sent to user ${userId} (${sentCount} connection${sentCount !== 1 ? 's' : ''})`);
    return sentCount > 0;
};

// Gửi đến nhiều users
export const sendMessageToUsers = (userIds: number[], message: any) => {
    const messageString = JSON.stringify(message);
    const userIdSet = new Set(userIds);
    let sentCount = 0;
    
    clients.forEach((metadata, client) => {
        if (metadata.userId && userIdSet.has(metadata.userId) && client.readyState === WebSocket.OPEN) {
            client.send(messageString);
            sentCount++;
        }
    });
    
    console.log(`📨 Sent to ${userIds.length} users (${sentCount} connection${sentCount !== 1 ? 's' : ''})`);
    return sentCount;
};

// 🚀 ROOM-BASED BROADCAST - Hiệu suất O(k) thay vì O(n)
// k = số client trong room, n = tổng số clients
export const broadcastToTripRoom = (tripId: number, message: any) => {
    const room = tripRooms.get(tripId);
    
    if (!room || room.size === 0) {
        // console.log(`⚠️ No clients in room trip-${tripId}`);
        return 0;
    }
    
    const messageString = JSON.stringify(message);
    let sentCount = 0;
    
    // Chỉ loop qua clients trong room này - SIÊU NHANH!
    room.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(messageString);
            sentCount++;
        }
    });
    
    console.log(`📍 Broadcasted trip ${tripId} update to ${sentCount}/${room.size} clients in room`);
    return sentCount;
};

// Utility: Lấy số lượng clients trong room
export const getRoomSize = (tripId: number): number => {
    return tripRooms.get(tripId)?.size || 0;
};

// Utility: Lấy tổng số rooms đang hoạt động
export const getTotalRooms = (): number => {
    return tripRooms.size;
};

// Utility: Stats để monitoring
export const getWebSocketStats = () => {
    return {
        totalClients: clients.size,
        totalRooms: tripRooms.size,
        roomDetails: Array.from(tripRooms.entries()).map(([tripId, room]) => ({
            tripId,
            clientCount: room.size
        }))
    };
};