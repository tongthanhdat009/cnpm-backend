"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nguoiDungRepo = exports.NguoiDungRepository = void 0;
const client_1 = __importDefault(require("../prisma/client"));
class NguoiDungRepository {
    async getAllNguoiDung() {
        return await client_1.default.nguoi_dung.findMany({
            where: { isDelete: false },
            select: {
                id_nguoi_dung: true,
                ho_ten: true,
                ten_tai_khoan: true,
                so_dien_thoai: true,
                vai_tro: true,
                ngay_tao: true,
                // Không select mat_khau_bam để bảo mật
            },
            orderBy: {
                ngay_tao: 'desc'
            }
        });
    }
    async getNguoiDungById(id) {
        return await client_1.default.nguoi_dung.findFirst({
            where: { id_nguoi_dung: id, isDelete: false },
            select: {
                id_nguoi_dung: true,
                ho_ten: true,
                ten_tai_khoan: true,
                so_dien_thoai: true,
                vai_tro: true,
                ngay_tao: true,
                // Không select mat_khau_bam để bảo mật
            }
        });
    }
    async getNguoiDungByVaiTro(vaiTro) {
        try {
            console.debug('[NguoiDungRepo] getNguoiDungByVaiTro request:', { vaiTro });
            const results = await client_1.default.nguoi_dung.findMany({
                where: { vai_tro: vaiTro, isDelete: false },
                select: {
                    id_nguoi_dung: true,
                    ho_ten: true,
                    ten_tai_khoan: true,
                    so_dien_thoai: true,
                    vai_tro: true,
                    ngay_tao: true,
                }
            });
            console.debug('[NguoiDungRepo] getNguoiDungByVaiTro resultCount:', results?.length ?? 0);
            return results;
        }
        catch (err) {
            console.error('[NguoiDungRepo] getNguoiDungByVaiTro error:', err?.message ?? err);
            throw err;
        }
    }
}
exports.NguoiDungRepository = NguoiDungRepository;
exports.nguoiDungRepo = new NguoiDungRepository();
//# sourceMappingURL=NguoiDungRepo.js.map