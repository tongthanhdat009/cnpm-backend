"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiemDanhRepo = void 0;
const client_1 = __importDefault(require("../prisma/client"));
class DiemDanhRepo {
    async findByIdWithTripStatus(id_diem_danh) {
        return client_1.default.diem_danh_chuyen_di.findUnique({
            where: { id_diem_danh },
            select: {
                id_diem_danh: true,
                id_chuyen_di: true,
                trang_thai: true,
                chuyen_di: {
                    select: {
                        id_chuyen_di: true,
                        trang_thai: true,
                        loai_chuyen_di: true,
                        id_tai_xe: true,
                        tuyen_duong: {
                            select: {
                                ten_tuyen_duong: true
                            }
                        }
                    }
                },
            },
        });
    }
    async updateTrangThai(id_diem_danh, trang_thai) {
        // Ensure the record exists first to return clean 404 semantics
        const existed = await client_1.default.diem_danh_chuyen_di.findUnique({ where: { id_diem_danh } });
        if (!existed)
            return null;
        const updated = await client_1.default.diem_danh_chuyen_di.update({
            where: { id_diem_danh },
            data: { trang_thai },
            include: {
                hoc_sinh: {
                    select: {
                        id_hoc_sinh: true,
                        ho_ten: true,
                        id_phu_huynh: true
                    }
                },
                chuyen_di: {
                    select: {
                        id_chuyen_di: true,
                        id_tai_xe: true,
                        loai_chuyen_di: true,
                        tuyen_duong: {
                            select: {
                                ten_tuyen_duong: true
                            }
                        }
                    }
                }
            }
        });
        return updated;
    }
}
exports.DiemDanhRepo = DiemDanhRepo;
exports.default = new DiemDanhRepo();
//# sourceMappingURL=DiemDanhRepo.js.map