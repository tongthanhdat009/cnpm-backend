"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThongBaoController = void 0;
const ThongBaoService_1 = __importDefault(require("../services/ThongBaoService"));
class ThongBaoController {
    async create(req, res) {
        try {
            const { tieu_de, noi_dung, id_nguoi_nhan, id_nguoi_gui } = req.body;
            if (!tieu_de || !noi_dung) {
                return res.status(400).json({ success: false, message: "Thiếu tiêu đề hoặc nội dung" });
            }
            const result = await ThongBaoService_1.default.createThongBao({
                tieu_de,
                noi_dung,
                // Kết nối người gửi và người nhận qua ID
                nguoi_dung_thong_bao_id_nguoi_guiTonguoi_dung: id_nguoi_gui ? { connect: { id_nguoi_dung: id_nguoi_gui } } : undefined,
                nguoi_dung_thong_bao_id_nguoi_nhanTonguoi_dung: id_nguoi_nhan ? { connect: { id_nguoi_dung: id_nguoi_nhan } } : undefined,
            });
            if (result.success) {
                return res.status(201).json(result);
            }
            else {
                return res.status(500).json(result);
            }
        }
        catch (error) {
            console.error("Error in ThongBaoController create:", error);
            return res.status(500).json({ success: false, message: "Lỗi server", error: error.message });
        }
    }
    async getAll(req, res) {
        try {
            const result = await ThongBaoService_1.default.getAllThongBao( /* userId */);
            if (result.success) {
                return res.status(200).json(result);
            }
            else {
                return res.status(500).json(result);
            }
        }
        catch (error) {
            console.error("Error in ThongBaoController getAll:", error);
            return res.status(500).json({ success: false, message: "Lỗi server", error: error.message });
        }
    }
    async getByIdNguoiDung(req, res) {
        try {
            const { id_nguoi_nhan } = req.params;
            if (id_nguoi_nhan === undefined) {
                return res.status(400).json({ success: false, message: "Thiếu ID người dùng trong URL" });
            }
            const idNguoiDung = parseInt(id_nguoi_nhan);
            if (isNaN(idNguoiDung)) {
                return res.status(400).json({ success: false, message: "ID người dùng không hợp lệ" });
            }
            const result = await ThongBaoService_1.default.getThongBaoByIdNguoiDung(idNguoiDung);
            if (result.success) {
                return res.status(200).json(result);
            }
            else {
                return res.status(404).json(result);
            }
        }
        catch (error) {
            console.error("Error in ThongBaoController getByIdNguoiDung:", error);
            return res.status(500).json({ success: false, message: "Lỗi server", error: error.message });
        }
    }
}
exports.ThongBaoController = ThongBaoController;
exports.default = new ThongBaoController();
//# sourceMappingURL=ThongBaoController.js.map