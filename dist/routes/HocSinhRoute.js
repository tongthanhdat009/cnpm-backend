"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const HocSinhController_1 = __importDefault(require("../controllers/HocSinhController"));
const router = (0, express_1.Router)();
router.get('/', HocSinhController_1.default.getAll.bind(HocSinhController_1.default));
router.get('/phu-huynh/:idPhuHuynh', HocSinhController_1.default.getByPhuHuynh.bind(HocSinhController_1.default));
router.get('/:id', HocSinhController_1.default.getById.bind(HocSinhController_1.default));
exports.default = router;
//# sourceMappingURL=HocSinhRoute.js.map