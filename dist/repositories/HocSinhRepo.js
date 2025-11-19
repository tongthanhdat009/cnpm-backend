"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HocSinhRepo = void 0;
const client_1 = __importDefault(require("../prisma/client"));
class HocSinhRepo {
    async getAll() {
        const data = await client_1.default.hoc_sinh.findMany({
            include: {
                phan_cong_hoc_sinh: {
                    select: {
                        id_tuyen_duong: true,
                    },
                }
            },
            orderBy: { id_hoc_sinh: 'asc' },
        });
        return data;
    }
    async getById(id) {
        return await client_1.default.hoc_sinh.findUnique({
            where: { id_hoc_sinh: id },
            include: { diem_dung: true },
        });
    }
    async getByPhuHuynh(idPhuHuynh) {
        return await client_1.default.hoc_sinh.findMany({
            where: { id_phu_huynh: idPhuHuynh },
            include: {
                diem_dung: true,
                nguoi_dung: {
                    select: {
                        id_nguoi_dung: true,
                        ho_ten: true,
                        so_dien_thoai: true
                    }
                }
            },
            orderBy: { id_hoc_sinh: 'asc' },
        });
    }
}
exports.HocSinhRepo = HocSinhRepo;
exports.default = new HocSinhRepo();
//# sourceMappingURL=HocSinhRepo.js.map