"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XeBuytController = void 0;
const XeBuytService_1 = require("../services/XeBuytService");
class XeBuytController {
    constructor() {
        this.service = new XeBuytService_1.XeBuytService();
    }
    async getAllXeBuyt(req, res) {
        const result = await this.service.getAllXeBuyt();
        if (result.success) {
            res.status(200).json(result);
        }
        else {
            res.status(500).json(result);
        }
    }
    async getXeBuytById(req, res) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: "Thiếu tham số id" });
        }
        const idNumber = parseInt(id, 10);
        if (Number.isNaN(idNumber)) {
            return res.status(400).json({ success: false, message: "Tham số id không hợp lệ" });
        }
        try {
            const result = await this.service.getXeBuytById(idNumber);
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
exports.XeBuytController = XeBuytController;
exports.default = new XeBuytController();
//# sourceMappingURL=XeBuytController.js.map