// backend/src/services/ThongBaoService.ts
import prisma from '../prisma/client';
import { broadcastMessage, sendMessageToUser } from '../websocket';
import { Prisma } from '@prisma/client';

export class ThongBaoService {
    async createThongBao(data: Prisma.thong_baoCreateInput) {
        try {
            // 1. Lưu thông báo vào database
            const newThongBao = await prisma.thong_bao.create({
                data: {
                    ...data,
                    thoi_gian: data.thoi_gian || new Date(), // Set thời gian nếu chưa có
                    da_xem: data.da_xem ?? false // Mặc định là chưa xem
                },
                include: { // Lấy thêm thông tin người gửi/nhận nếu cần hiển thị ngay
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
                const sent = sendMessageToUser(newThongBao.id_nguoi_nhan, wsMessage);
                if (!sent) {
                    console.warn(`⚠️ User ${newThongBao.id_nguoi_nhan} is not connected via WebSocket`);
                }
            } else {
                // Gửi đến tất cả nếu không có người nhận cụ thể
                broadcastMessage(wsMessage);
            }

            return { success: true, message: "Gửi thông báo thành công", data: newThongBao };
        } catch (error: any) {
            console.error("Lỗi khi tạo thông báo:", error);
            return { success: false, message: "Lỗi server khi tạo thông báo", error: error.message };
        }
    }

    async getAllThongBao(userId?: number) { // Optional: Lấy thông báo cho user cụ thể
         try {
             const whereClause = userId ? { id_nguoi_nhan: userId } : {};
             const thongBaos = await prisma.thong_bao.findMany({
                where: whereClause,
                orderBy: { thoi_gian: 'desc' },
                include: {
                    nguoi_dung_thong_bao_id_nguoi_guiTonguoi_dung: { select: { ho_ten: true } }
                }
             });
             return { success: true, data: thongBaos };
         } catch (error: any) {
              console.error("Lỗi khi lấy danh sách thông báo:", error);
              return { success: false, message: "Lỗi server khi lấy thông báo", error: error.message };
         }
    }

    async getThongBaoByIdNguoiDung(id: number) {
        try {
            const thongBaos = await prisma.thong_bao.findMany({
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
        } catch (error: any) {
            console.error("Lỗi khi lấy thông báo theo ID người dùng:", error);
            return { success: false, message: "Lỗi server khi lấy thông báo", error: error.message };
        }
    }

}

export default new ThongBaoService();