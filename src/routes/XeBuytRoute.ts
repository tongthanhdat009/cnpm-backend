import XeBuytController from "../controllers/XeBuytController";
import { Router } from "express";
const router = Router();

router.get("/", XeBuytController.getAllXeBuyt.bind(XeBuytController));
router.get("/:id", XeBuytController.getXeBuytById.bind(XeBuytController));
router.post("/", XeBuytController.createXeBuyt.bind(XeBuytController));
router.put("/:id", XeBuytController.updateXeBuyt.bind(XeBuytController));
router.delete("/:id", XeBuytController.deleteXeBuyt.bind(XeBuytController));

export default router;
