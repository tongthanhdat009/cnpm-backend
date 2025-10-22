import { Router } from "express";
import { TuyenDuongController } from "../controllers/TuyenDuongController";

const router = Router();
const tuyenDuongController = new TuyenDuongController();
router.get("/", tuyenDuongController.getAll.bind(tuyenDuongController));
router.get("/:id", tuyenDuongController.getTuyenDuongById.bind(tuyenDuongController));
router.get("/:id/thoi-luong-du-kien", tuyenDuongController.getThoiLuongDuKien.bind(tuyenDuongController));

export default router;
