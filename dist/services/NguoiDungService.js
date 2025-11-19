"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NguoiDungService = void 0;
const NguoiDungRepo_1 = require("../repositories/NguoiDungRepo");
class NguoiDungService {
    constructor() {
        this.repo = new NguoiDungRepo_1.NguoiDungRepository();
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
        }
        catch (error) {
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
    async getNguoiDungById(id) {
        try {
            const nguoiDung = await this.repo.getNguoiDungById(id);
            return {
                success: true,
                message: "Lấy người dùng thành công",
                data: nguoiDung
            };
        }
        catch (error) {
            return {
                success: false,
                message: "Lỗi khi lấy người dùng",
                error: error.message
            };
        }
    }
    /**
     * Lấy người dùng theo vai trò
     */
    async getNguoiDungByVaiTro(vaiTro) {
        try {
            const nguoiDungs = await this.repo.getNguoiDungByVaiTro(vaiTro);
            return {
                success: true,
                message: "Lấy danh sách người dùng theo vai trò thành công",
                data: nguoiDungs,
                total: nguoiDungs.length
            };
        }
        catch (error) {
            return {
                success: false,
                message: "Lỗi khi lấy danh sách người dùng theo vai trò",
                error: error.message
            };
        }
    }
}
exports.NguoiDungService = NguoiDungService;
//# sourceMappingURL=NguoiDungService.js.map