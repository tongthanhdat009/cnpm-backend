import { NguoiDungController } from "../controllers/NguoiDungController";
import { Router } from "express";
const router = Router();
const nguoiDungController = new NguoiDungController();

router.get("/", nguoiDungController.getAllNguoiDung.bind(nguoiDungController));

router.get("/:id", nguoiDungController.getNguoiDungById.bind(nguoiDungController));
export default router;