"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TaiXeController_1 = __importDefault(require("../controllers/TaiXeController"));
const router = (0, express_1.Router)();
// (no top-level debug logs)
router.get('/', TaiXeController_1.default.getAll.bind(TaiXeController_1.default));
router.get('/:id', TaiXeController_1.default.getById.bind(TaiXeController_1.default));
router.post('/', TaiXeController_1.default.create.bind(TaiXeController_1.default));
router.put('/:id', TaiXeController_1.default.update.bind(TaiXeController_1.default));
router.delete('/:id', TaiXeController_1.default.delete.bind(TaiXeController_1.default));
exports.default = router;
//# sourceMappingURL=TaiXeRoute.js.map