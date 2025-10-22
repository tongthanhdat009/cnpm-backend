import NguoiDungController from '../controllers/NguoiDungController';
import { Router } from "express";
const router = Router();

router.get("/", NguoiDungController.getAllNguoiDung.bind(NguoiDungController));

router.get("/:id", NguoiDungController.getNguoiDungById.bind(NguoiDungController));

router.get("/vai-tro/:vaiTro", NguoiDungController.getNguoiDungByVaiTro.bind(NguoiDungController));
export default router;