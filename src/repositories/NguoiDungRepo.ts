import prisma from "../prisma/client";

export class NguoiDungRepository {
    async getAllNguoiDung() {
        return await prisma.nguoi_dung.findMany({
            select: {
                id_nguoi_dung: true,
                ho_ten: true,
                ten_tai_khoan: true,
                so_dien_thoai: true,
                vai_tro: true,
                ngay_tao: true,
                // Không select mat_khau_bam để bảo mật
            },
            orderBy: {
                ngay_tao: 'desc'
            }
        });
    }

    async getNguoiDungById(id: number) {
        return await prisma.nguoi_dung.findUnique({
            where: { id_nguoi_dung: id },
            select: {
                id_nguoi_dung: true,
                ho_ten: true,
                ten_tai_khoan: true,
                so_dien_thoai: true,
                vai_tro: true,
                ngay_tao: true,
                // Không select mat_khau_bam để bảo mật
            }
        });
    }
}