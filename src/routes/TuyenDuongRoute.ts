import { Router } from "express";
import { TuyenDuongController } from "../controllers/TuyenDuongController";

const router = Router();

router.get("/", TuyenDuongController.getAll);

export default router;
