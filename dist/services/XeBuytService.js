"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XeBuytService = void 0;
const XeBuytRepo_1 = require("../repositories/XeBuytRepo");
class XeBuytService {
    constructor() {
        this.repo = new XeBuytRepo_1.XeBuytRepository();
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
        }
        catch (error) {
            return {
                success: false,
                message: "Lỗi khi lấy danh sách xe buýt",
                error: error.message
            };
        }
    }
    async getXeBuytById(id) {
        try {
            const xeBuyt = await this.repo.getXeBuytById(id);
            return {
                success: true,
                message: "Lấy thông tin xe buýt thành công",
                data: xeBuyt
            };
        }
        catch (error) {
            return {
                success: false,
                message: "Lỗi khi lấy thông tin xe buýt",
                error: error.message
            };
        }
    }
}
exports.XeBuytService = XeBuytService;
//# sourceMappingURL=XeBuytService.js.map