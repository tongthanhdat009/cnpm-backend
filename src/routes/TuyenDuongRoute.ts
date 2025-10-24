import { Router } from "express";
import { TuyenDuongController } from "../controllers/TuyenDuongController";

const router = Router();
const tuyenDuongController = new TuyenDuongController();
router.get("/", tuyenDuongController.getAll.bind(tuyenDuongController));
router.get("/:id", tuyenDuongController.getTuyenDuongById.bind(tuyenDuongController));
router.get("/:id/thoi-luong-du-kien", tuyenDuongController.getThoiLuongDuKien.bind(tuyenDuongController));
router.post("/", tuyenDuongController.create.bind(tuyenDuongController));
router.put("/:id", tuyenDuongController.update.bind(tuyenDuongController));
router.delete("/:id", tuyenDuongController.delete.bind(tuyenDuongController));
router.post("/:id/phan-cong-hoc-sinh/:hocSinhId", tuyenDuongController.assignStudent.bind(tuyenDuongController));
router.delete("/:id/phan-cong-hoc-sinh/:hocSinhId", tuyenDuongController.unassignStudent.bind(tuyenDuongController));


export default router;
