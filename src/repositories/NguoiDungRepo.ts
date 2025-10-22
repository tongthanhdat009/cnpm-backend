import { nguoi_dung_vai_tro } from "@prisma/client";
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
    async getNguoiDungByVaiTro(vaiTro: nguoi_dung_vai_tro) {
        return await prisma.nguoi_dung.findMany({
            where: { vai_tro: vaiTro },
            select: {
                id_nguoi_dung: true,
                ho_ten: true,
                ten_tai_khoan: true,
                so_dien_thoai: true,
                vai_tro: true,
                ngay_tao: true,
            }
        });
    }
}

export const nguoiDungRepo = new NguoiDungRepository();