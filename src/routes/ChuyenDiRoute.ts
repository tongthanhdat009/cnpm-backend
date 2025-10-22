import { Router } from "express";
import chuyenDiController from "../controllers/ChuyenDiController";

const router = Router();

router.get("/", chuyenDiController.getAllChuyenDi.bind(chuyenDiController));

router.get("/:id", chuyenDiController.getChuyenDiById.bind(chuyenDiController));

export default router;