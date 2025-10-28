// backend/src/websocket.ts
import WebSocket, { WebSocketServer } from 'ws';
import { Server } from 'http';

let wss: WebSocketServer;

// Lưu trữ client với userId
interface ClientMetadata {
    userId?: number;
}

const clients = new Map<WebSocket, ClientMetadata>();

export const initWebSocket = (server: Server) => {
    wss = new WebSocketServer({ server });

    console.log('🚀 WebSocket Server is running');

    wss.on('connection', (ws) => {
        console.log('✅ Client connected');
        clients.set(ws, {}); // Khởi tạo metadata rỗng

        ws.on('message', (message) => {
            try {
                const data = JSON.parse(message.toString());
                console.log('📨 Received message:', data);

                // Xử lý xác thực client - lưu userId
                if (data.type === 'authenticate' && data.userId) {
                    const metadata = clients.get(ws);
                    if (metadata) {
                        metadata.userId = data.userId;
                        clients.set(ws, metadata);
                        console.log(`✅ Client authenticated as userId: ${data.userId}`);
                        
                        // Gửi xác nhận về client
                        ws.send(JSON.stringify({ 
                            type: 'authenticated', 
                            userId: data.userId 
                        }));
                    }
                }
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        });

        ws.on('close', () => {
            const metadata = clients.get(ws);
            console.log(`❌ Client disconnected${metadata?.userId ? ` (userId: ${metadata.userId})` : ''}`);
            clients.delete(ws);
        });

        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
            clients.delete(ws);
        });
    });
};

// Hàm gửi thông báo đến tất cả client
export const broadcastMessage = (message: any) => {
    const messageString = JSON.stringify(message);
    console.log(`📢 Broadcasting message to ${clients.size} clients`);
    clients.forEach((metadata, client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(messageString);
        }
    });
};

// Hàm gửi thông báo đến một user cụ thể
export const sendMessageToUser = (userId: number, message: any) => {
    const messageString = JSON.stringify(message);
    let sentCount = 0;
    
    clients.forEach((metadata, client) => {
        if (metadata.userId === userId && client.readyState === WebSocket.OPEN) {
            client.send(messageString);
            sentCount++;
        }
    });
    
    console.log(`📨 Sent message to user ${userId} (${sentCount} connection${sentCount !== 1 ? 's' : ''})`);
    return sentCount > 0;
};

// Hàm gửi thông báo đến nhiều user cụ thể
export const sendMessageToUsers = (userIds: number[], message: any) => {
    const messageString = JSON.stringify(message);
    let sentCount = 0;
    
    clients.forEach((metadata, client) => {
        if (metadata.userId && userIds.includes(metadata.userId) && client.readyState === WebSocket.OPEN) {
            client.send(messageString);
            sentCount++;
        }
    });
    
    console.log(`📨 Sent message to ${userIds.length} users (${sentCount} connection${sentCount !== 1 ? 's' : ''})`);
    return sentCount;
};