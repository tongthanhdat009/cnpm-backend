"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const client_1 = __importDefault(require("../prisma/client"));
class AuthRepository {
    /**
     * Tìm người dùng theo tên tài khoản
     */
    async findUserByUsername(ten_tai_khoan) {
        return await client_1.default.nguoi_dung.findUnique({
            where: { ten_tai_khoan },
            select: {
                id_nguoi_dung: true,
                ho_ten: true,
                ten_tai_khoan: true,
                mat_khau_bam: true,
                vai_tro: true,
                so_dien_thoai: true,
                ngay_tao: true,
            },
        });
    }
    /**
     * Tìm người dùng theo ID
     */
    async findUserById(id_nguoi_dung) {
        return await client_1.default.nguoi_dung.findUnique({
            where: { id_nguoi_dung },
            select: {
                id_nguoi_dung: true,
                ho_ten: true,
                ten_tai_khoan: true,
                vai_tro: true,
                so_dien_thoai: true,
                ngay_tao: true,
            },
        });
    }
    /**
     * Kiểm tra tên tài khoản đã tồn tại
     */
    async isUsernameExists(ten_tai_khoan) {
        const user = await client_1.default.nguoi_dung.findUnique({
            where: { ten_tai_khoan },
            select: { id_nguoi_dung: true },
        });
        return user !== null;
    }
    /**
     * Kiểm tra số điện thoại đã tồn tại
     */
    async isPhoneExists(so_dien_thoai) {
        const user = await client_1.default.nguoi_dung.findUnique({
            where: { so_dien_thoai },
            select: { id_nguoi_dung: true },
        });
        return user !== null;
    }
    /**
     * Tìm người dùng theo số điện thoại
     */
    async findUserByPhone(so_dien_thoai) {
        return await client_1.default.nguoi_dung.findUnique({
            where: { so_dien_thoai },
            select: {
                id_nguoi_dung: true,
                ho_ten: true,
                ten_tai_khoan: true,
                vai_tro: true,
                so_dien_thoai: true,
                ngay_tao: true,
            },
        });
    }
    /**
     * Tạo người dùng mới
     */
    async createUser(userData) {
        return await client_1.default.nguoi_dung.create({
            data: {
                ho_ten: userData.ho_ten,
                ten_tai_khoan: userData.ten_tai_khoan,
                mat_khau_bam: userData.mat_khau_bam,
                so_dien_thoai: userData.so_dien_thoai || null,
                vai_tro: userData.vai_tro,
            },
        });
    }
    /**
     * Đếm số lượng người dùng theo vai trò
     */
    async countUsersByRole(vai_tro) {
        return await client_1.default.nguoi_dung.count({
            where: { vai_tro },
        });
    }
    /**
     * Lấy danh sách tất cả người dùng (dùng cho admin)
     */
    async getAllUsers(skip, take) {
        return await client_1.default.nguoi_dung.findMany({
            skip,
            take,
            select: {
                id_nguoi_dung: true,
                ho_ten: true,
                ten_tai_khoan: true,
                vai_tro: true,
                so_dien_thoai: true,
                ngay_tao: true,
                mat_khau_bam: false,
            },
            orderBy: {
                ngay_tao: 'desc',
            },
        });
    }
    /**
     * Cập nhật người dùng theo id
     */
    async updateUser(id_nguoi_dung, data) {
        // Build update payload only with provided fields to avoid sending undefined to Prisma
        const updatePayload = {};
        if (data.ho_ten !== undefined)
            updatePayload.ho_ten = data.ho_ten;
        if (data.ten_tai_khoan !== undefined)
            updatePayload.ten_tai_khoan = data.ten_tai_khoan;
        if (data.mat_khau_bam !== undefined)
            updatePayload.mat_khau_bam = data.mat_khau_bam;
        if (data.so_dien_thoai !== undefined)
            updatePayload.so_dien_thoai = data.so_dien_thoai ?? null;
        try {
            console.debug('[AuthRepo] updateUser id, payload =>', { id_nguoi_dung, updatePayload });
            return await client_1.default.nguoi_dung.update({
                where: { id_nguoi_dung },
                data: updatePayload,
                select: {
                    id_nguoi_dung: true,
                    ho_ten: true,
                    ten_tai_khoan: true,
                    vai_tro: true,
                    so_dien_thoai: true,
                    ngay_tao: true,
                },
            });
        }
        catch (err) {
            console.error('[AuthRepo] updateUser error:', err?.message ?? err, err?.code ?? 'no-code');
            throw err;
        }
    }
    /**
     * Xóa người dùng
     */
    async deleteUser(id_nguoi_dung) {
        return await client_1.default.nguoi_dung.delete({
            where: { id_nguoi_dung },
        });
    }
}
exports.AuthRepository = AuthRepository;
exports.default = new AuthRepository();
//# sourceMappingURL=AuthRepo.js.map