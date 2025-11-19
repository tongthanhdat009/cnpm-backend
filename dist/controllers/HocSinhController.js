"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HocSinhController = void 0;
const HocSinhService_1 = __importDefault(require("../services/HocSinhService"));
class HocSinhController {
    async getAll(req, res) {
        try {
            const data = await HocSinhService_1.default.getAll();
            res.json(data);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi server khi lấy danh sách học sinh' });
        }
    }
    async getById(req, res) {
        const idParam = req.params.id;
        if (!idParam)
            return res.status(400).json({ message: 'Thiếu tham số id' });
        const id = parseInt(idParam, 10);
        if (Number.isNaN(id))
            return res.status(400).json({ message: 'Tham số id không hợp lệ' });
        try {
            const data = await HocSinhService_1.default.getById(id);
            if (!data)
                return res.status(404).json({ message: 'Không tìm thấy học sinh' });
            res.json(data);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi server khi lấy học sinh' });
        }
    }
    async getByPhuHuynh(req, res) {
        const idParam = req.params.idPhuHuynh;
        if (!idParam)
            return res.status(400).json({ message: 'Thiếu tham số idPhuHuynh' });
        const idPhuHuynh = parseInt(idParam, 10);
        if (Number.isNaN(idPhuHuynh))
            return res.status(400).json({ message: 'Tham số idPhuHuynh không hợp lệ' });
        try {
            const data = await HocSinhService_1.default.getByPhuHuynh(idPhuHuynh);
            res.json(data);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi server khi lấy danh sách học sinh theo phụ huynh' });
        }
    }
}
exports.HocSinhController = HocSinhController;
exports.default = new HocSinhController();
//# sourceMappingURL=HocSinhController.js.map