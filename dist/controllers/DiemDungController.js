"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiemDungController = void 0;
const DiemDungService_1 = __importDefault(require("../services/DiemDungService"));
class DiemDungController {
    async getAll(req, res) {
        try {
            const data = await DiemDungService_1.default.getAll({ q: req.query.q });
            res.json(data);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi server khi lấy danh sách điểm dừng' });
        }
    }
    async getById(req, res) {
        const idParam = req.params.id;
        if (!idParam)
            return res.status(400).json({ message: 'Thiếu tham số id' });
        const id = parseInt(idParam, 10);
        if (Number.isNaN(id)) {
            return res.status(400).json({ message: 'Tham số id không hợp lệ' });
        }
        try {
            const data = await DiemDungService_1.default.getById(id);
            if (!data)
                return res.status(404).json({ message: 'Không tìm thấy điểm dừng' });
            res.json(data);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi server khi lấy điểm dừng' });
        }
    }
    async getUnassignedCounts(req, res) {
        try {
            const data = await DiemDungService_1.default.getUnassignedStudentCounts();
            res.json(data);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi server khi lấy số lượng học sinh chưa phân công' });
        }
    }
    async create(req, res) {
        try {
            const result = await DiemDungService_1.default.create(req.body);
            if (!result.success)
                return res.status(400).json(result);
            res.json(result);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi server khi tạo điểm dừng' });
        }
    }
    async update(req, res) {
        const id = parseInt(req.params.id, 10);
        if (Number.isNaN(id))
            return res.status(400).json({ message: 'Id không hợp lệ' });
        try {
            const result = await DiemDungService_1.default.update(id, req.body);
            if (!result.success)
                return res.status(400).json(result);
            res.json(result);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi server khi cập nhật điểm dừng' });
        }
    }
    async delete(req, res) {
        const id = parseInt(req.params.id, 10);
        if (Number.isNaN(id))
            return res.status(400).json({ message: 'Id không hợp lệ' });
        try {
            const result = await DiemDungService_1.default.remove(id);
            res.json(result);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi server khi xóa điểm dừng' });
        }
    }
}
exports.DiemDungController = DiemDungController;
exports.default = new DiemDungController();
//# sourceMappingURL=DiemDungController.js.map