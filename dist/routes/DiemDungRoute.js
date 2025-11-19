"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DiemDungController_1 = __importDefault(require("../controllers/DiemDungController"));
const router = (0, express_1.Router)();
router.get('/', DiemDungController_1.default.getAll.bind(DiemDungController_1.default));
router.get('/unassigned-counts', DiemDungController_1.default.getUnassignedCounts.bind(DiemDungController_1.default));
router.get('/:id', DiemDungController_1.default.getById.bind(DiemDungController_1.default));
router.post('/', DiemDungController_1.default.create.bind(DiemDungController_1.default));
router.put('/:id', DiemDungController_1.default.update.bind(DiemDungController_1.default));
router.delete('/:id', DiemDungController_1.default.delete.bind(DiemDungController_1.default));
exports.default = router;
//# sourceMappingURL=DiemDungRoute.js.map