"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TuyenDuongController_1 = require("../controllers/TuyenDuongController");
const router = (0, express_1.Router)();
const tuyenDuongController = new TuyenDuongController_1.TuyenDuongController();
router.get("/", tuyenDuongController.getAll.bind(tuyenDuongController));
router.get("/:id", tuyenDuongController.getTuyenDuongById.bind(tuyenDuongController));
router.get("/:id/thoi-luong-du-kien", tuyenDuongController.getThoiLuongDuKien.bind(tuyenDuongController));
router.post("/", tuyenDuongController.create.bind(tuyenDuongController));
router.put("/:id", tuyenDuongController.update.bind(tuyenDuongController));
router.delete("/:id", tuyenDuongController.delete.bind(tuyenDuongController));
router.post("/:id/phan-cong-hoc-sinh/:hocSinhId", tuyenDuongController.assignStudent.bind(tuyenDuongController));
router.delete("/:id/phan-cong-hoc-sinh/:hocSinhId", tuyenDuongController.unassignStudent.bind(tuyenDuongController));
exports.default = router;
//# sourceMappingURL=TuyenDuongRoute.js.map