"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HocSinhService = void 0;
const HocSinhRepo_1 = __importDefault(require("../repositories/HocSinhRepo"));
class HocSinhService {
    constructor() {
        this.repo = HocSinhRepo_1.default;
    }
    async getAll() {
        const data = await this.repo.getAll();
        return data;
    }
    async getById(id) {
        const data = await this.repo.getById(id);
        return data;
    }
    async getByPhuHuynh(idPhuHuynh) {
        const data = await this.repo.getByPhuHuynh(idPhuHuynh);
        return data;
    }
}
exports.HocSinhService = HocSinhService;
exports.default = new HocSinhService();
//# sourceMappingURL=HocSinhService.js.map