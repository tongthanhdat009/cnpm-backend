"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const XeBuytController_1 = __importDefault(require("../controllers/XeBuytController"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", XeBuytController_1.default.getAllXeBuyt.bind(XeBuytController_1.default));
router.get("/:id", XeBuytController_1.default.getXeBuytById.bind(XeBuytController_1.default));
exports.default = router;
//# sourceMappingURL=XeBuytRoute.js.map