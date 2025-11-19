"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/routes/ThongBaoRoute.ts
const express_1 = require("express");
const ThongBaoController_1 = __importDefault(require("../controllers/ThongBaoController"));
// Import middleware xác thực nếu có
// import authMiddleware from '../middleware/authMiddleware';
const router = (0, express_1.Router)();
// POST /api/v1/thong-bao - Tạo thông báo mới (cần xác thực người gửi)
router.post('/', ThongBaoController_1.default.create);
// GET /api/v1/thong-bao - Lấy danh sách thông báo (có thể cần xác thực để lọc theo người nhận)
router.get('/', ThongBaoController_1.default.getAll);
// GET /api/v1/thong-bao/nguoi-nhan/:id_nguoi_nhan - Lấy thông báo theo ID người nhận
router.get('/nguoi-nhan/:id_nguoi_nhan', ThongBaoController_1.default.getByIdNguoiDung);
// Các route khác: PUT /:id/read, DELETE /:id, ...
exports.default = router;
//# sourceMappingURL=ThongBaoRoute.js.map