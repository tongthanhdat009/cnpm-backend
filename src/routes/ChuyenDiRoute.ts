import { Router } from "express";
import chuyenDiController from "../controllers/ChuyenDiController";

const router = Router();

router.get("/", chuyenDiController.getAllChuyenDi.bind(chuyenDiController));

router.get("/hoc-sinh/:idHocSinh", chuyenDiController.getChuyenDiByHocSinh.bind(chuyenDiController));

// Đặt các routes cụ thể TRƯỚC route có tham số :id
router.patch("/:id/trang-thai", chuyenDiController.updateTrangThai.bind(chuyenDiController));
router.post("/:id/incident-warning", chuyenDiController.sendIncidentWarning.bind(chuyenDiController));

// Route với tham số :id phải đặt SAU
router.get("/:id", chuyenDiController.getChuyenDiById.bind(chuyenDiController));
router.post("/", chuyenDiController.createRecurringChuyenDi.bind(chuyenDiController));
router.put("/:id", chuyenDiController.updateChuyenDi.bind(chuyenDiController));
router.delete("/:id", chuyenDiController.deleteChuyenDi.bind(chuyenDiController));

export default router;