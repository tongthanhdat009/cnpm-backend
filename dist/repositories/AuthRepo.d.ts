import { nguoi_dung, nguoi_dung_vai_tro } from '@prisma/client';
/**
 * Repository layer cho Authentication
 * Xử lý các truy vấn database liên quan đến người dùng
 */
export interface CreateUserData {
    ho_ten: string;
    ten_tai_khoan: string;
    mat_khau_bam: string;
    so_dien_thoai?: string;
    vai_tro: nguoi_dung_vai_tro;
}
export declare class AuthRepository {
    /**
     * Tìm người dùng theo tên tài khoản
     */
    findUserByUsername(ten_tai_khoan: string): Promise<any | null>;
    /**
     * Tìm người dùng theo ID
     */
    findUserById(id_nguoi_dung: number): Promise<any | null>;
    /**
     * Kiểm tra tên tài khoản đã tồn tại
     */
    isUsernameExists(ten_tai_khoan: string): Promise<boolean>;
    /**
     * Kiểm tra số điện thoại đã tồn tại
     */
    isPhoneExists(so_dien_thoai: string): Promise<boolean>;
    /**
     * Tìm người dùng theo số điện thoại
     */
    findUserByPhone(so_dien_thoai: string): Promise<any | null>;
    /**
     * Tạo người dùng mới
     */
    createUser(userData: CreateUserData): Promise<nguoi_dung>;
    /**
     * Đếm số lượng người dùng theo vai trò
     */
    countUsersByRole(vai_tro: nguoi_dung_vai_tro): Promise<number>;
    /**
     * Lấy danh sách tất cả người dùng (dùng cho admin)
     */
    getAllUsers(skip?: number, take?: number): Promise<{
        id_nguoi_dung: number;
        ten_tai_khoan: string;
        so_dien_thoai: string | null;
        ho_ten: string;
        vai_tro: import(".prisma/client").$Enums.nguoi_dung_vai_tro;
        ngay_tao: Date;
    }[]>;
    /**
     * Cập nhật người dùng theo id
     */
    updateUser(id_nguoi_dung: number, data: Partial<CreateUserData & {
        mat_khau_bam?: string;
    }>): Promise<{
        id_nguoi_dung: number;
        ten_tai_khoan: string;
        so_dien_thoai: string | null;
        ho_ten: string;
        vai_tro: import(".prisma/client").$Enums.nguoi_dung_vai_tro;
        ngay_tao: Date;
    }>;
    /**
     * Xóa người dùng
     */
    deleteUser(id_nguoi_dung: number): Promise<{
        id_nguoi_dung: number;
        ten_tai_khoan: string;
        so_dien_thoai: string | null;
        ho_ten: string;
        mat_khau_bam: string;
        vai_tro: import(".prisma/client").$Enums.nguoi_dung_vai_tro;
        ngay_tao: Date;
        isDelete: boolean;
    }>;
}
declare const _default: AuthRepository;
export default _default;
//# sourceMappingURL=AuthRepo.d.ts.map