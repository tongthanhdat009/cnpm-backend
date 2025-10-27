import { Router } from "express";
import chuyenDiController from "../controllers/ChuyenDiController";

const router = Router();

router.get("/", chuyenDiController.getAllChuyenDi.bind(chuyenDiController));

router.get("/:id", chuyenDiController.getChuyenDiById.bind(chuyenDiController));

router.post("/", chuyenDiController.createRecurringChuyenDi.bind(chuyenDiController));

router.put("/:id", chuyenDiController.updateChuyenDi.bind(chuyenDiController));

export default router;