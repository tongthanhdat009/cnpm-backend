import XeBuytController from "../controllers/XeBuytController";
import { Router } from "express";
const router = Router();

router.get("/", XeBuytController.getAllXeBuyt.bind(XeBuytController));
router.get("/:id", XeBuytController.getXeBuytById.bind(XeBuytController));

export default router;