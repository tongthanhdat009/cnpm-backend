"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DiemDanhController_1 = __importDefault(require("../controllers/DiemDanhController"));
const router = (0, express_1.Router)();
// Cập nhật trạng thái điểm danh: PATCH /api/v1/diem-danh/:id { trang_thai }
router.patch('/:id', DiemDanhController_1.default.updateTrangThai.bind(DiemDanhController_1.default));
exports.default = router;
//# sourceMappingURL=DiemDanhRoute.js.map