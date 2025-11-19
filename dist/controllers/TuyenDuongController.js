"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TuyenDuongController = void 0;
const TuyenDuongService_1 = __importDefault(require("../services/TuyenDuongService"));
class TuyenDuongController {
    async getAll(req, res) {
        try {
            const data = await TuyenDuongService_1.default.getAll();
            res.json(data);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Lỗi server khi lấy tuyến đường" });
        }
    }
    async create(req, res) {
        try {
            const data = await TuyenDuongService_1.default.create(req.body);
            res.status(201).json(data);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message || "Lỗi server khi tạo tuyến đường" });
        }
    }
    async getTuyenDuongById(req, res) {
        if (!req.params.id) {
            return res.status(400).json({ message: "Thiếu tham số id" });
        }
        const id = parseInt(req.params.id, 10);
        try {
            const data = await TuyenDuongService_1.default.getTuyenDuongById(id);
            if (!data) {
                return res.status(404).json({ message: "Không tìm thấy tuyến đường" });
            }
            res.json(data);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Lỗi server khi lấy tuyến đường" });
        }
    }
    async getThoiLuongDuKien(req, res) {
        if (!req.params.id) {
            return res.status(400).json({ message: "Thiếu tham số id" });
        }
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: "ID không hợp lệ" });
        }
        try {
            const data = await TuyenDuongService_1.default.getThoiLuongDuKien(id);
            res.json(data);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                message: error.message || "Lỗi server khi tính thời lượng dự kiến"
            });
        }
    }
    async update(req, res) {
        if (!req.params.id)
            return res.status(400).json({ message: 'Thiếu tham số id' });
        const id = parseInt(String(req.params.id), 10);
        if (Number.isNaN(id))
            return res.status(400).json({ message: 'ID không hợp lệ' });
        try {
            const payload = { ...req.body, id_tuyen_duong: id };
            const result = await TuyenDuongService_1.default.update(payload);
            if (result?.type === 'not_found')
                return res.status(404).json({ message: 'Không tìm thấy tuyến đường' });
            return res.json({ message: 'Cập nhật tuyến thành công', data: result.record ?? result });
        }
        catch (error) {
            console.error(error);
            return res.status(400).json({ message: error.message || 'Lỗi khi cập nhật tuyến đường' });
        }
    }
    async delete(req, res) {
        if (!req.params.id) {
            return res.status(400).json({ message: "Thiếu tham số id" });
        }
        const id = parseInt(req.params.id, 10);
        if (isNaN(id))
            return res.status(400).json({ message: "ID không hợp lệ" });
        try {
            const result = await TuyenDuongService_1.default.deleteTuyenDuong(id);
            if (result.type === 'not_found') {
                return res.status(404).json({ message: 'Không tìm thấy tuyến đường' });
            }
            return res.json({ message: `Xóa tuyến thành công (${result.type})`, deletedTrips: result.deletedTrips });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message || 'Lỗi server khi xóa tuyến đường' });
        }
    }
    async assignStudent(req, res) {
        const idParam = req.params.id;
        const hsParam = req.params.hocSinhId ?? req.body?.id_hoc_sinh;
        if (!idParam || hsParam == null) {
            return res.status(400).json({ message: 'Thiếu tham số id hoặc id_hoc_sinh' });
        }
        const id = parseInt(String(idParam), 10);
        const hocSinhId = parseInt(String(hsParam), 10);
        if (Number.isNaN(id) || Number.isNaN(hocSinhId)) {
            return res.status(400).json({ message: 'ID không hợp lệ' });
        }
        try {
            const result = await TuyenDuongService_1.default.assignHocSinhToTuyen(id, hocSinhId);
            switch (result.type) {
                case 'not_found_tuyen':
                    return res.status(404).json({ message: 'Không tìm thấy tuyến đường' });
                case 'not_found_hoc_sinh':
                    return res.status(404).json({ message: 'Không tìm thấy học sinh' });
                case 'existed':
                    return res.status(200).json({ message: 'Học sinh đã được phân công cho tuyến này' });
                case 'created':
                    return res.status(201).json({ message: 'Phân công thành công', data: result.record });
                default:
                    return res.status(500).json({ message: 'Lỗi không xác định' });
            }
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message || 'Lỗi server khi phân công học sinh' });
        }
    }
    async unassignStudent(req, res) {
        const idParam = req.params.id;
        const hsParam = req.params.hocSinhId ?? req.body?.id_hoc_sinh;
        if (!idParam || hsParam == null) {
            return res.status(400).json({ message: 'Thiếu tham số id hoặc id_hoc_sinh' });
        }
        const id = parseInt(String(idParam), 10);
        const hocSinhId = parseInt(String(hsParam), 10);
        if (Number.isNaN(id) || Number.isNaN(hocSinhId)) {
            return res.status(400).json({ message: 'ID không hợp lệ' });
        }
        try {
            const result = await TuyenDuongService_1.default.removeHocSinhFromTuyen(id, hocSinhId);
            if (result.type === 'not_found') {
                return res.status(404).json({ message: 'Không tìm thấy phân công' });
            }
            return res.json({ message: 'Hủy phân công thành công', deletedCount: result.deletedCount });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message || 'Lỗi server khi hủy phân công học sinh' });
        }
    }
}
exports.TuyenDuongController = TuyenDuongController;
exports.default = new TuyenDuongController();
//# sourceMappingURL=TuyenDuongController.js.map