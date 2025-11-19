"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebSocketStats = exports.getTotalRooms = exports.getRoomSize = exports.broadcastToTripRoom = exports.sendMessageToUsers = exports.sendMessageToUser = exports.broadcastMessage = exports.initWebSocket = void 0;
// backend/src/websocket.ts
const ws_1 = __importStar(require("ws"));
let wss;
// Map để lưu thông tin client
const clients = new Map();
// 🚀 ROOM-BASED ARCHITECTURE - Hiệu suất cao
// Key: tripId, Value: Set of WebSocket clients đang theo dõi chuyến đó
const tripRooms = new Map();
// Map ngược: từ WebSocket -> Set of tripIds đang theo dõi (để dễ cleanup)
const clientTrips = new Map();
const initWebSocket = (server) => {
    wss = new ws_1.WebSocketServer({ server });
    console.log('🚀 WebSocket Server is running (Room-based)');
    wss.on('connection', (ws) => {
        console.log('✅ Client connected');
        clients.set(ws, {});
        clientTrips.set(ws, new Set());
        ws.on('message', (message) => {
            try {
                const data = JSON.parse(message.toString());
                const metadata = clients.get(ws);
                if (!metadata)
                    return;
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
                    tripRooms.get(tripId).add(ws);
                    // Lưu lại tripId vào client để dễ cleanup
                    clientTrips.get(ws)?.add(tripId);
                    console.log(`👁️ Client (userId: ${metadata.userId}) joined room trip-${tripId}. Room size: ${tripRooms.get(tripId).size}`);
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
            }
            catch (error) {
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
exports.initWebSocket = initWebSocket;
// Hàm broadcast cho tất cả clients (dùng cho admin)
const broadcastMessage = (message) => {
    const messageString = JSON.stringify(message);
    let sentCount = 0;
    clients.forEach((metadata, client) => {
        if (client.readyState === ws_1.default.OPEN) {
            client.send(messageString);
            sentCount++;
        }
    });
    console.log(`📢 Broadcasted to ${sentCount}/${clients.size} clients`);
};
exports.broadcastMessage = broadcastMessage;
// Gửi đến một user cụ thể
const sendMessageToUser = (userId, message) => {
    const messageString = JSON.stringify(message);
    let sentCount = 0;
    clients.forEach((metadata, client) => {
        if (metadata.userId === userId && client.readyState === ws_1.default.OPEN) {
            client.send(messageString);
            sentCount++;
        }
    });
    console.log(`📨 Sent to user ${userId} (${sentCount} connection${sentCount !== 1 ? 's' : ''})`);
    return sentCount > 0;
};
exports.sendMessageToUser = sendMessageToUser;
// Gửi đến nhiều users
const sendMessageToUsers = (userIds, message) => {
    const messageString = JSON.stringify(message);
    const userIdSet = new Set(userIds);
    let sentCount = 0;
    clients.forEach((metadata, client) => {
        if (metadata.userId && userIdSet.has(metadata.userId) && client.readyState === ws_1.default.OPEN) {
            client.send(messageString);
            sentCount++;
        }
    });
    console.log(`📨 Sent to ${userIds.length} users (${sentCount} connection${sentCount !== 1 ? 's' : ''})`);
    return sentCount;
};
exports.sendMessageToUsers = sendMessageToUsers;
// 🚀 ROOM-BASED BROADCAST - Hiệu suất O(k) thay vì O(n)
// k = số client trong room, n = tổng số clients
const broadcastToTripRoom = (tripId, message) => {
    const room = tripRooms.get(tripId);
    if (!room || room.size === 0) {
        // console.log(`⚠️ No clients in room trip-${tripId}`);
        return 0;
    }
    const messageString = JSON.stringify(message);
    let sentCount = 0;
    // Chỉ loop qua clients trong room này - SIÊU NHANH!
    room.forEach(client => {
        if (client.readyState === ws_1.default.OPEN) {
            client.send(messageString);
            sentCount++;
        }
    });
    console.log(`📍 Broadcasted trip ${tripId} update to ${sentCount}/${room.size} clients in room`);
    return sentCount;
};
exports.broadcastToTripRoom = broadcastToTripRoom;
// Utility: Lấy số lượng clients trong room
const getRoomSize = (tripId) => {
    return tripRooms.get(tripId)?.size || 0;
};
exports.getRoomSize = getRoomSize;
// Utility: Lấy tổng số rooms đang hoạt động
const getTotalRooms = () => {
    return tripRooms.size;
};
exports.getTotalRooms = getTotalRooms;
// Utility: Stats để monitoring
const getWebSocketStats = () => {
    return {
        totalClients: clients.size,
        totalRooms: tripRooms.size,
        roomDetails: Array.from(tripRooms.entries()).map(([tripId, room]) => ({
            tripId,
            clientCount: room.size
        }))
    };
};
exports.getWebSocketStats = getWebSocketStats;
//# sourceMappingURL=websocket.js.map