"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XeBuytRepository = void 0;
const client_1 = __importDefault(require("../prisma/client"));
class XeBuytRepository {
    async getAllXeBuyt() {
        return await client_1.default.xe_buyt.findMany({
            select: {
                id_xe_buyt: true,
                bien_so_xe: true,
                so_ghe: true,
                hang: true,
                vi_do_hien_tai: true,
                kinh_do_hien_tai: true,
                anh: true
            },
            orderBy: {
                id_xe_buyt: 'asc'
            }
        });
    }
    async getXeBuytById(id) {
        return await client_1.default.xe_buyt.findUnique({
            where: { id_xe_buyt: id },
            select: {
                id_xe_buyt: true,
                bien_so_xe: true,
                so_ghe: true,
                hang: true,
                vi_do_hien_tai: true,
                kinh_do_hien_tai: true,
                anh: true
            },
        });
    }
}
exports.XeBuytRepository = XeBuytRepository;
//# sourceMappingURL=XeBuytRepo.js.map