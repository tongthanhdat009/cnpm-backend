"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThongBaoService = void 0;
// backend/src/services/ThongBaoService.ts
const client_1 = __importDefault(require("../prisma/client"));
const websocket_1 = require("../websocket");
const timezone_1 = require("../utils/timezone");
class ThongBaoService {
    async createThongBao(data) {
        try {
            // 1. Lưu thông báo vào database
            const newThongBao = await client_1.default.thong_bao.create({
                data: {
                    ...data,
                    thoi_gian: data.thoi_gian || (0, timezone_1.getVietnamTime)(), // Sử dụng giờ Việt Nam
                    da_xem: data.da_xem ?? false // Mặc định là chưa xem
                },
                include: {
                    nguoi_dung_thong_bao_id_nguoi_guiTonguoi_dung: {
                        select: { ho_ten: true }
                    },
                    nguoi_dung_thong_bao_id_nguoi_nhanTonguoi_dung: {
                        select: { ho_ten: true }
                    }
                }
            });
            // 2. Gửi thông báo qua WebSocket
            const wsMessage = {
                type: 'NEW_NOTIFICATION',
                payload: newThongBao
            };
            if (newThongBao.id_nguoi_nhan) {
                // Gửi đến người nhận cụ thể
                const sent = (0, websocket_1.sendMessageToUser)(newThongBao.id_nguoi_nhan, wsMessage);
                if (!sent) {
                    console.warn(`⚠️ User ${newThongBao.id_nguoi_nhan} is not connected via WebSocket`);
                }
            }
            else {
                // Gửi đến tất cả nếu không có người nhận cụ thể
                (0, websocket_1.broadcastMessage)(wsMessage);
            }
            return { success: true, message: "Gửi thông báo thành công", data: newThongBao };
        }
        catch (error) {
            console.error("Lỗi khi tạo thông báo:", error);
            return { success: false, message: "Lỗi server khi tạo thông báo", error: error.message };
        }
    }
    async getAllThongBao(userId) {
        try {
            const whereClause = userId ? { id_nguoi_nhan: userId } : {};
            const thongBaos = await client_1.default.thong_bao.findMany({
                where: whereClause,
                orderBy: { thoi_gian: 'desc' },
                include: {
                    nguoi_dung_thong_bao_id_nguoi_guiTonguoi_dung: { select: { ho_ten: true } }
                }
            });
            return { success: true, data: thongBaos };
        }
        catch (error) {
            console.error("Lỗi khi lấy danh sách thông báo:", error);
            return { success: false, message: "Lỗi server khi lấy thông báo", error: error.message };
        }
    }
    async getThongBaoByIdNguoiDung(id) {
        try {
            const thongBaos = await client_1.default.thong_bao.findMany({
                where: {
                    OR: [
                        { id_nguoi_nhan: { equals: id } },
                        { id_nguoi_nhan: { equals: null } }
                    ]
                },
                include: {
                    nguoi_dung_thong_bao_id_nguoi_guiTonguoi_dung: { select: { ho_ten: true, vai_tro: true } },
                },
                orderBy: {
                    thoi_gian: 'desc'
                }
            });
            return { success: true, data: thongBaos };
        }
        catch (error) {
            console.error("Lỗi khi lấy thông báo theo ID người dùng:", error);
            return { success: false, message: "Lỗi server khi lấy thông báo", error: error.message };
        }
    }
}
exports.ThongBaoService = ThongBaoService;
exports.default = new ThongBaoService();
//# sourceMappingURL=ThongBaoService.js.map