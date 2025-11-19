"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaiXeService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const AuthRepo_1 = __importDefault(require("../repositories/AuthRepo"));
const NguoiDungRepo_1 = require("../repositories/NguoiDungRepo");
const ChuyenDiRepo_1 = require("../repositories/ChuyenDiRepo");
const AuthService_1 = __importDefault(require("./AuthService"));
const timezone_1 = require("../utils/timezone");
const client_1 = __importDefault(require("../prisma/client"));
const SALT_ROUNDS = 10;
class TaiXeService {
    constructor() {
        this.nguoiDungRepo = new NguoiDungRepo_1.NguoiDungRepository();
        this.chuyenDiRepo = new ChuyenDiRepo_1.ChuyenDiRepository();
    }
    async getAllTaiXe() {
        try {
            const data = await this.nguoiDungRepo.getNguoiDungByVaiTro('tai_xe');
            console.debug('[TaiXeService] getAllTaiXe returned count:', data?.length ?? 0);
            return { success: true, message: 'Lấy danh sách tài xế thành công', data, total: data.length };
        }
        catch (err) {
            console.error('[TaiXeService] getAllTaiXe error:', err?.message ?? err);
            return { success: false, message: 'Lỗi khi lấy danh sách tài xế', error: err.message };
        }
    }
    async getTaiXeById(id) {
        try {
            const user = await this.nguoiDungRepo.getNguoiDungById(id);
            if (!user)
                return { success: false, message: 'Tài xế không tồn tại' };
            if (user.vai_tro !== 'tai_xe')
                return { success: false, message: 'Người dùng không phải tài xế' };
            return { success: true, message: 'Lấy tài xế thành công', data: user };
        }
        catch (err) {
            return { success: false, message: 'Lỗi khi lấy tài xế', error: err.message };
        }
    }
    async createTaiXe(payload) {
        try {
            // Normalize input then delegate to authService.register which handles validation and hashing
            const ho_ten = (payload.ho_ten ?? '').trim();
            const ten_tai_khoan = (payload.ten_tai_khoan ?? '').trim();
            let so_dien_thoai = payload.so_dien_thoai ?? undefined;
            if (so_dien_thoai) {
                // Chuẩn hóa số điện thoại: bỏ ký tự không phải số, chuyển +84xxx -> 0xxx
                const digits = so_dien_thoai.replace(/\D+/g, '');
                if (digits.startsWith('84') && digits.length >= 11) {
                    so_dien_thoai = '0' + digits.slice(2);
                }
                else {
                    so_dien_thoai = digits;
                }
            }
            const created = await AuthService_1.default.register({
                ho_ten,
                ten_tai_khoan,
                mat_khau: payload.mat_khau,
                so_dien_thoai,
                vai_tro: 'tai_xe'
            });
            return { success: true, message: 'Tạo tài xế thành công', data: created };
        }
        catch (err) {
            console.error('[TaiXeService] createTaiXe error:', err?.message ?? err);
            // Surface underlying validation/business message to client
            return { success: false, message: err?.message || 'Lỗi khi tạo tài xế', error: err?.message };
        }
    }
    async updateTaiXe(id, payload) {
        try {
            // Validate input similarly to register
            // Ensure user exists and is a driver
            const existing = await AuthRepo_1.default.findUserById(id);
            if (!existing)
                return { success: false, message: 'Tài xế không tồn tại' };
            if (existing.vai_tro !== 'tai_xe')
                return { success: false, message: 'Người dùng không phải tài xế' };
            // Validation rules
            if (payload.ten_tai_khoan !== undefined && payload.ten_tai_khoan !== null) {
                const username = payload.ten_tai_khoan.trim();
                const usernameRegex = /^[a-zA-Z0-9_]{3,50}$/;
                if (!usernameRegex.test(username)) {
                    return { success: false, message: 'Tên tài khoản không hợp lệ (3-50 ký tự, chỉ chữ/số/_)' };
                }
                // Check uniqueness if changed
                if (username !== existing.ten_tai_khoan) {
                    const other = await AuthRepo_1.default.findUserByUsername(username);
                    if (other && other.id_nguoi_dung !== id) {
                        return { success: false, message: 'Tên tài khoản đã được sử dụng bởi người khác' };
                    }
                }
            }
            if (payload.so_dien_thoai !== undefined) {
                const phone = payload.so_dien_thoai;
                if (phone !== null && phone !== '') {
                    const phoneRegex = /^[0-9]{10,11}$/;
                    if (!phoneRegex.test(phone)) {
                        return { success: false, message: 'Số điện thoại không hợp lệ (10-11 chữ số)' };
                    }
                    // Check uniqueness
                    const otherByPhone = await AuthRepo_1.default.findUserByPhone(phone);
                    if (otherByPhone && otherByPhone.id_nguoi_dung !== id) {
                        return { success: false, message: 'Số điện thoại đã được sử dụng bởi người khác' };
                    }
                }
            }
            if (payload.mat_khau !== undefined && payload.mat_khau !== null && payload.mat_khau !== '') {
                if (payload.mat_khau.length < 6) {
                    return { success: false, message: 'Mật khẩu phải có ít nhất 6 ký tự' };
                }
            }
            // Build updateData only for provided fields
            const updateData = {};
            if (payload.ho_ten !== undefined)
                updateData.ho_ten = payload.ho_ten;
            if (payload.ten_tai_khoan !== undefined)
                updateData.ten_tai_khoan = payload.ten_tai_khoan;
            if (payload.so_dien_thoai !== undefined)
                updateData.so_dien_thoai = payload.so_dien_thoai ?? null;
            if (payload.mat_khau) {
                const mat_khau_bam = await bcrypt_1.default.hash(payload.mat_khau, SALT_ROUNDS);
                updateData.mat_khau_bam = mat_khau_bam;
            }
            console.debug('[TaiXeService] updateTaiXe id, updateData =>', { id, updateData });
            const updated = await AuthRepo_1.default.updateUser(id, updateData);
            console.debug('[TaiXeService] updateTaiXe updated =>', { id: updated?.id_nguoi_dung });
            return { success: true, message: 'Cập nhật tài xế thành công', data: updated };
        }
        catch (err) {
            console.error('[TaiXeService] updateTaiXe error:', err?.message ?? err, err?.code ?? 'no-code');
            // Provide Prisma error code info when available to help the client
            const code = err?.code ?? null;
            if (code === 'P2025') {
                return { success: false, message: 'Tài xế không tồn tại', error: err.message, code };
            }
            if (code === 'P2002') {
                // unique constraint failed (e.g., ten_tai_khoan or so_dien_thoai)
                return { success: false, message: 'Trùng giá trị unique (tên tài khoản hoặc số điện thoại)', error: err.message, code };
            }
            return { success: false, message: 'Lỗi khi cập nhật tài xế', error: err.message, code };
        }
    }
    async deleteTaiXe(id, replaceWithId) {
        try {
            console.debug('[TaiXeService] deleteTaiXe id =>', id, 'replaceWithId =>', replaceWithId);
            // Check whether driver has any FUTURE or TODAY trips (VN time)
            const trips = await this.chuyenDiRepo.getChuyenDiByTaiXe(id);
            const todayVN = (0, timezone_1.formatVietnamTime)(new Date(), 'date'); // YYYY-MM-DD in VN
            const isOnOrAfterToday = (d) => (0, timezone_1.formatVietnamTime)(d, 'date') >= todayVN;
            const futureOrTodayTrips = (trips || []).filter((t) => isOnOrAfterToday(t.ngay));
            if (futureOrTodayTrips.length > 0) {
                // If no replacement provided, return trips and instruct client to provide replacement
                if (!replaceWithId) {
                    return {
                        success: false,
                        message: 'Tài xế đang có lịch trình từ hôm nay trở đi. Vui lòng chỉ định tài xế thay thế trước khi xóa.',
                        data: futureOrTodayTrips,
                        code: 'HAS_TRIPS'
                    };
                }
                // Replacement provided — validate
                if (replaceWithId === id) {
                    return { success: false, message: 'Tài xế thay thế không thể là chính tài xế này' };
                }
                const replacement = await AuthRepo_1.default.findUserById(replaceWithId);
                if (!replacement) {
                    return { success: false, message: 'Tài xế thay thế không tồn tại' };
                }
                if (replacement.vai_tro !== 'tai_xe') {
                    return { success: false, message: 'Người được chọn không phải là tài xế' };
                }
                // Check schedule conflicts: replacement must not have trips that conflict
                // Rule: conflict if same date (ngay) and same gio_khoi_hanh
                const replacementTripsAll = await this.chuyenDiRepo.getChuyenDiByTaiXe(replaceWithId);
                const replacementTrips = (replacementTripsAll || []).filter((t) => isOnOrAfterToday(t.ngay));
                const conflicts = [];
                // Build quick index for replacement trips by ngay + gio_khoi_hanh in VN date and UTC time parts
                const pad2 = (n) => n.toString().padStart(2, '0');
                const timeKey = (dateTime) => `${pad2(dateTime.getUTCHours())}:${pad2(dateTime.getUTCMinutes())}:${pad2(dateTime.getUTCSeconds())}`;
                const repIndex = new Map();
                for (const rt of replacementTrips) {
                    const key = `${(0, timezone_1.formatVietnamTime)(rt.ngay, 'date')}|${timeKey(rt.gio_khoi_hanh)}`;
                    const arr = repIndex.get(key) || [];
                    arr.push(rt);
                    repIndex.set(key, arr);
                }
                for (const t of futureOrTodayTrips) {
                    const key = `${(0, timezone_1.formatVietnamTime)(t.ngay, 'date')}|${timeKey(t.gio_khoi_hanh)}`;
                    const matched = repIndex.get(key);
                    if (matched && matched.length > 0) {
                        conflicts.push({ reassignTrip: t, with: matched });
                    }
                }
                if (conflicts.length > 0) {
                    return {
                        success: false,
                        message: 'Tài xế thay thế đang có lịch trùng. Vui lòng chọn tài xế khác.',
                        code: 'REPLACE_CONFLICT',
                        data: { conflicts, trips: futureOrTodayTrips }
                    };
                }
                // Reassign ONLY future/today trips
                for (const trip of futureOrTodayTrips) {
                    await client_1.default.chuyen_di.update({
                        where: { id_chuyen_di: trip.id_chuyen_di },
                        data: { id_tai_xe: replaceWithId }
                    });
                }
                console.debug('[TaiXeService] reassignChuyenDiTaiXe (future only) count =>', futureOrTodayTrips.length);
            }
            // Soft delete: mark user isDelete = true instead of removing references
            const updated = await client_1.default.nguoi_dung.update({
                where: { id_nguoi_dung: id },
                data: { isDelete: true }
            });
            console.debug('[TaiXeService] soft-deleted driver id =>', id);
            return { success: true, message: 'Xóa mềm tài xế thành công', data: { id, ho_ten: updated.ho_ten } };
        }
        catch (err) {
            console.error('[TaiXeService] deleteTaiXe error:', err?.message ?? err, err?.code ?? 'no-code');
            const code = err?.code ?? null;
            if (code === 'P2025') {
                return { success: false, message: 'Tài xế không tồn tại hoặc đã bị xóa', error: err.message, code };
            }
            if (code === 'P2003') {
                // foreign key constraint failed — referenced elsewhere
                return { success: false, message: 'Không thể xóa mềm tài xế vì bị tham chiếu lỗi FK', error: err.message, code };
            }
            return { success: false, message: 'Lỗi khi xóa mềm tài xế', error: err.message, code };
        }
    }
}
exports.TaiXeService = TaiXeService;
exports.default = new TaiXeService();
//# sourceMappingURL=TaiXeService.js.map