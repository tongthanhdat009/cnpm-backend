"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NguoiDungController_1 = __importDefault(require("../controllers/NguoiDungController"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", NguoiDungController_1.default.getAllNguoiDung.bind(NguoiDungController_1.default));
router.get("/:id", NguoiDungController_1.default.getNguoiDungById.bind(NguoiDungController_1.default));
router.get("/vai-tro/:vaiTro", NguoiDungController_1.default.getNguoiDungByVaiTro.bind(NguoiDungController_1.default));
exports.default = router;
//# sourceMappingURL=NguoiDungRoute.js.map