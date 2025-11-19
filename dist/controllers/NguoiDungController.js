"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NguoiDungController = void 0;
const NguoiDungService_1 = require("../services/NguoiDungService");
class NguoiDungController {
    constructor() {
        this.service = new NguoiDungService_1.NguoiDungService();
    }
    async getAllNguoiDung(req, res) {
        const result = await this.service.getAllNguoiDung();
        if (result.success) {
            res.status(200).json(result);
        }
        else {
            res.status(500).json(result);
        }
    }
    async getNguoiDungById(req, res) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: "Thiếu tham số id" });
        }
        const idNumber = parseInt(id, 10);
        if (Number.isNaN(idNumber)) {
            return res.status(400).json({ success: false, message: "Tham số id không hợp lệ" });
        }
        try {
            const result = await this.service.getNguoiDungById(idNumber);
            if (result.success) {
                return res.status(200).json(result);
            }
            else {
                return res.status(404).json(result);
            }
        }
        catch (err) {
            return res.status(500).json({ success: false, message: "Lỗi máy chủ", error: err.message });
        }
    }
    async getNguoiDungByVaiTro(req, res) {
        const { vaiTro } = req.params;
        if (!vaiTro) {
            return res.status(400).json({ success: false, message: "Thiếu tham số vaiTro" });
        }
        try {
            const result = await this.service.getNguoiDungByVaiTro(vaiTro);
            if (result.success) {
                return res.status(200).json(result);
            }
            else {
                return res.status(404).json(result);
            }
        }
        catch (err) {
            return res.status(500).json({ success: false, message: "Lỗi máy chủ", error: err.message });
        }
    }
}
exports.NguoiDungController = NguoiDungController;
exports.default = new NguoiDungController();
//# sourceMappingURL=NguoiDungController.js.map