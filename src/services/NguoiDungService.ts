import { NguoiDungRepository } from "../repositories/NguoiDungRepo";
export class NguoiDungService {
    private repo: NguoiDungRepository;
    
    constructor() {
        this.repo = new NguoiDungRepository();
    }

    /**
     * Lấy tất cả người dùng
     */
    async getAllNguoiDung() {
        try {
            const nguoiDungs = await this.repo.getAllNguoiDung();
            return {
                success: true,
                message: "Lấy danh sách người dùng thành công",
                data: nguoiDungs,
                total: nguoiDungs.length
            };
        } catch (error: any) {
            return {
                success: false,
                message: "Lỗi khi lấy danh sách người dùng",
                error: error.message
            };
        }
    }

    /**
     * Lấy người dùng theo ID
     */
    async getNguoiDungById(id: number) {
        try {
            const nguoiDung = await this.repo.getNguoiDungById(id);
            return {
                success: true,
                message: "Lấy người dùng thành công",
                data: nguoiDung
            };
        } catch (error: any) {
            return {
                success: false,
                message: "Lỗi khi lấy người dùng",
                error: error.message
            };
        }
    }
}