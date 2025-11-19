import { Server } from 'http';
export declare const initWebSocket: (server: Server) => void;
export declare const broadcastMessage: (message: any) => void;
export declare const sendMessageToUser: (userId: number, message: any) => boolean;
export declare const sendMessageToUsers: (userIds: number[], message: any) => number;
export declare const broadcastToTripRoom: (tripId: number, message: any) => number;
export declare const getRoomSize: (tripId: number) => number;
export declare const getTotalRooms: () => number;
export declare const getWebSocketStats: () => {
    totalClients: number;
    totalRooms: number;
    roomDetails: {
        tripId: number;
        clientCount: number;
    }[];
};
//# sourceMappingURL=websocket.d.ts.map