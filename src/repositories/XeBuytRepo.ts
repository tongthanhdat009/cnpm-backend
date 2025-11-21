import prisma from "../prisma/client";
import { Prisma } from "@prisma/client";

// Định nghĩa và export interface cho dữ liệu xe buýt, thêm 'hang'
export interface XeBuytData {
    bien_so_xe: string;
    hang?: string | null; // Thêm cột hang
    loai_xe?: string | null;
    so_ghe?: number | null;
}

export class XeBuytRepository {
    /**
     * Lấy tất cả xe buýt
     */
    async getAllXeBuyt() {
        return await prisma.xe_buyt.findMany({
            orderBy: {
                id_xe_buyt: 'asc'
            }
        });
    }

    /**
     * Lấy xe buýt theo ID
     */
    async getXeBuytById(id: number) {
        return await prisma.xe_buyt.findUnique({
            where: {
                id_xe_buyt: id
            }
        });
    }

    /**
     * Tạo một xe buýt mới
     */
    async createXeBuyt(data: XeBuytData) {
        try {
            return await prisma.xe_buyt.create({
                data: data
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                const target = error.meta?.target;
                let bienSoXe: string | undefined;

                if (typeof data.bien_so_xe === 'string') {
                    bienSoXe = data.bien_so_xe;
                }

                throw new Error(`Biển số xe "${bienSoXe || 'không xác định'}" đã tồn tại.`);
            }
            throw error;
        }
    }
    
    /**
     * Cập nhật thông tin xe buýt
     */
    async updateXeBuyt(id: number, data: Partial<XeBuytData>) {
        try {
            return await prisma.xe_buyt.update({
                where: { id_xe_buyt: id },
                data: data
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new Error(`Cập nhật thất bại: Biển số xe đã tồn tại.`);
            }
            throw error;
        }
    }

    /**
     * Xóa một xe buýt
     */
    async deleteXeBuyt(id: number) {
        try {
            return await prisma.xe_buyt.delete({
                where: { id_xe_buyt: id }
            });
        } catch (error) {
            throw error;
        }
    }
}
