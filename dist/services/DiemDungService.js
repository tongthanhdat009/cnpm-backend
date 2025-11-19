"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiemDungService = void 0;
const DiemDungRepo_1 = __importDefault(require("../repositories/DiemDungRepo"));
class DiemDungService {
    constructor() {
        this.repo = DiemDungRepo_1.default;
    }
    async getAll(params) {
        const data = await this.repo.getAll(params?.q);
        return data;
    }
    async getById(id) {
        const data = await this.repo.getById(id);
        return data;
    }
    async getUnassignedStudentCounts() {
        const data = await this.repo.getUnassignedStudentCounts();
        return data;
    }
    async create(payload) {
        const name = (payload?.ten_diem_dung || '').trim();
        if (!name)
            return { success: false, message: 'Thiếu tên điểm dừng' };
        const vi_do = Number(payload?.vi_do);
        const kinh_do = Number(payload?.kinh_do);
        if (!Number.isFinite(vi_do) || vi_do < -90 || vi_do > 90)
            return { success: false, message: 'Vĩ độ không hợp lệ (-90..90)' };
        if (!Number.isFinite(kinh_do) || kinh_do < -180 || kinh_do > 180)
            return { success: false, message: 'Kinh độ không hợp lệ (-180..180)' };
        const created = await this.repo.create({ ten_diem_dung: name, dia_chi: payload?.dia_chi || null, vi_do, kinh_do });
        return { success: true, message: 'Tạo trạm thành công', data: created };
    }
    async update(id, payload) {
        if (!id)
            return { success: false, message: 'Thiếu id điểm dừng' };
        const data = {};
        if (payload.ten_diem_dung !== undefined)
            data.ten_diem_dung = String(payload.ten_diem_dung).trim();
        if (payload.dia_chi !== undefined)
            data.dia_chi = payload.dia_chi ?? null;
        if (payload.vi_do !== undefined) {
            const vi_do = Number(payload.vi_do);
            if (!Number.isFinite(vi_do) || vi_do < -90 || vi_do > 90)
                return { success: false, message: 'Vĩ độ không hợp lệ (-90..90)' };
            data.vi_do = vi_do;
        }
        if (payload.kinh_do !== undefined) {
            const kinh_do = Number(payload.kinh_do);
            if (!Number.isFinite(kinh_do) || kinh_do < -180 || kinh_do > 180)
                return { success: false, message: 'Kinh độ không hợp lệ (-180..180)' };
            data.kinh_do = kinh_do;
        }
        const updated = await this.repo.update(id, data);
        return { success: true, message: 'Cập nhật trạm thành công', data: updated };
    }
    async remove(id) {
        if (!id)
            return { success: false, message: 'Thiếu id điểm dừng' };
        await this.repo.delete(id);
        return { success: true, message: 'Xóa trạm thành công' };
    }
}
exports.DiemDungService = DiemDungService;
exports.default = new DiemDungService();
//# sourceMappingURL=DiemDungService.js.map