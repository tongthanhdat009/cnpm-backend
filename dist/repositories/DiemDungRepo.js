"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiemDungRepo = void 0;
const client_1 = __importDefault(require("../prisma/client"));
class DiemDungRepo {
    async getAll(q) {
        const where = {};
        if (q && q.trim()) {
            where.OR = [
                { ten_diem_dung: { contains: q.trim(), mode: 'insensitive' } },
                { dia_chi: { contains: q.trim(), mode: 'insensitive' } },
            ];
        }
        const data = await client_1.default.diem_dung.findMany({
            where,
            select: {
                id_diem_dung: true,
                ten_diem_dung: true,
                dia_chi: true,
                vi_do: true,
                kinh_do: true,
            },
            orderBy: { id_diem_dung: 'asc' },
        });
        return data;
    }
    async getById(id) {
        return await client_1.default.diem_dung.findUnique({
            where: { id_diem_dung: id },
        });
    }
    // Trả về danh sách { id_diem_dung, so_luong_hoc_sinh_con }
    async getUnassignedStudentCounts() {
        const result = await client_1.default.$queryRaw `
      SELECT hoc_sinh.id_diem_dung AS id_diem_dung, COUNT(hoc_sinh.id_hoc_sinh) AS so_luong_hoc_sinh_con
      FROM hoc_sinh
      WHERE hoc_sinh.id_hoc_sinh NOT IN (
        SELECT phan_cong_hoc_sinh.id_hoc_sinh
        FROM phan_cong_hoc_sinh
      )
      GROUP BY hoc_sinh.id_diem_dung;
    `;
        // Prisma may return BigInt for count/ids depending on DB driver. Convert to numbers/strings to be JSON-safe.
        const mapped = result.map(row => ({
            id_diem_dung: typeof row.id_diem_dung === 'bigint' ? Number(row.id_diem_dung) : row.id_diem_dung,
            so_luong_hoc_sinh_con: typeof row.so_luong_hoc_sinh_con === 'bigint' ? Number(row.so_luong_hoc_sinh_con) : Number(row.so_luong_hoc_sinh_con)
        }));
        return mapped;
    }
    async create(data) {
        return await client_1.default.diem_dung.create({
            data: {
                ten_diem_dung: data.ten_diem_dung,
                dia_chi: data.dia_chi ?? null,
                vi_do: new (require('@prisma/client').Prisma.Decimal)(data.vi_do),
                kinh_do: new (require('@prisma/client').Prisma.Decimal)(data.kinh_do),
            },
        });
    }
    async update(id, data) {
        const payload = {};
        if (data.ten_diem_dung !== undefined)
            payload.ten_diem_dung = data.ten_diem_dung;
        if (data.dia_chi !== undefined)
            payload.dia_chi = data.dia_chi;
        if (data.vi_do !== undefined)
            payload.vi_do = new (require('@prisma/client').Prisma.Decimal)(data.vi_do);
        if (data.kinh_do !== undefined)
            payload.kinh_do = new (require('@prisma/client').Prisma.Decimal)(data.kinh_do);
        return await client_1.default.diem_dung.update({ where: { id_diem_dung: id }, data: payload });
    }
    async delete(id) {
        return await client_1.default.diem_dung.delete({ where: { id_diem_dung: id } });
    }
}
exports.DiemDungRepo = DiemDungRepo;
exports.default = new DiemDungRepo();
//# sourceMappingURL=DiemDungRepo.js.map