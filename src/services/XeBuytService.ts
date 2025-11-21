import { XeBuytRepository, XeBuytData } from "../repositories/XeBuytRepo";

export class XeBuytService {
    private repo: XeBuytRepository;

    constructor() {
        this.repo = new XeBuytRepository();
    }
    
    async getAllXeBuyt() {
        try {
            const xeBuyts = await this.repo.getAllXeBuyt();
            return {
                success: true,
                message: "Lấy danh sách xe buýt thành công",
                data: xeBuyts,
                total: xeBuyts.length
            };
        } catch (error: any) {
            return {
                success: false,
                message: "Lỗi khi lấy danh sách xe buýt",
                error: error.message
            };
        }
    }

    async getXeBuytById(id: number) {
        try {
            const xeBuyt = await this.repo.getXeBuytById(id);
            return {
                success: true,
                message: "Lấy thông tin xe buýt thành công",
                data: xeBuyt
            };
        } catch (error: any) {
            return {
                success: false,
                message: "Lỗi khi lấy thông tin xe buýt",
                error: error.message
            };
        }
    }

    async createXeBuyt(data: XeBuytData) {
        try {
            const { bien_so_xe, hang, so_ghe } = data;

            if (!bien_so_xe || bien_so_xe.trim() === "") {
                return { success: false, message: "Biển số xe không được để trống" };
            }

            const newXeBuyt = await this.repo.createXeBuyt({
                bien_so_xe: bien_so_xe.trim(),
                hang,
                so_ghe: so_ghe != null ? Number(so_ghe) : null
            });

            return {
                success: true,
                message: "Tạo xe buýt thành công",
                data: newXeBuyt
            };
        } catch (error: any) {
            return { success: false, message: "Lỗi khi tạo xe buýt", error: error.message };
        }
    }

    async updateXeBuyt(id: number, data: XeBuytData) {
        try {
            const { bien_so_xe, hang, so_ghe } = data;

            if (!bien_so_xe || bien_so_xe.trim() === "") {
                return { success: false, message: "Biển số xe không được để trống" };
            }

            const updatedXeBuyt = await this.repo.updateXeBuyt(id, {
                bien_so_xe: bien_so_xe.trim(),
                hang,
                so_ghe: so_ghe != null ? Number(so_ghe) : null
            });

            return {
                success: true,
                message: "Cập nhật xe buýt thành công",
                data: updatedXeBuyt
            };
        } catch (error: any) {
            return { success: false, message: "Lỗi khi cập nhật xe buýt", error: error.message };
        }
    }

    async deleteXeBuyt(id: number) {
        try {
            await this.repo.deleteXeBuyt(id);
            return { success: true, message: "Xóa xe buýt thành công" };
        } catch (error: any) {
            return { success: false, message: "Lỗi khi xóa xe buýt", error: error.message };
        }
    }
}
