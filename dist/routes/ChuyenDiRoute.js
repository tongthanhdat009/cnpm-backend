"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ChuyenDiController_1 = __importDefault(require("../controllers/ChuyenDiController"));
const router = (0, express_1.Router)();
router.get("/", ChuyenDiController_1.default.getAllChuyenDi.bind(ChuyenDiController_1.default));
router.get("/hoc-sinh/:idHocSinh", ChuyenDiController_1.default.getChuyenDiByHocSinh.bind(ChuyenDiController_1.default));
// Đặt các routes cụ thể TRƯỚC route có tham số :id
router.patch("/:id/trang-thai", ChuyenDiController_1.default.updateTrangThai.bind(ChuyenDiController_1.default));
router.post("/:id/incident-warning", ChuyenDiController_1.default.sendIncidentWarning.bind(ChuyenDiController_1.default));
// Route với tham số :id phải đặt SAU
router.get("/:id", ChuyenDiController_1.default.getChuyenDiById.bind(ChuyenDiController_1.default));
router.post("/", ChuyenDiController_1.default.createRecurringChuyenDi.bind(ChuyenDiController_1.default));
router.put("/:id", ChuyenDiController_1.default.updateChuyenDi.bind(ChuyenDiController_1.default));
router.delete("/:id", ChuyenDiController_1.default.deleteChuyenDi.bind(ChuyenDiController_1.default));
exports.default = router;
//# sourceMappingURL=ChuyenDiRoute.js.map