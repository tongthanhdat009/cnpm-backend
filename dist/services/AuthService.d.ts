import { nguoi_dung_vai_tro } from '@prisma/client';
export interface RegisterData {
    ho_ten: string;
    ten_tai_khoan: string;
    mat_khau: string;
    so_dien_thoai?: string;
    vai_tro: nguoi_dung_vai_tro;
}
export interface LoginData {
    ten_tai_khoan: string;
    mat_khau: string;
}
export interface UserResponse {
    id_nguoi_dung: number;
    ho_ten: string;
    ten_tai_khoan: string;
    vai_tro: nguoi_dung_vai_tro;
    so_dien_thoai: string | null;
    ngay_tao?: Date;
}
export declare class AuthService {
    /**
     * Validate dữ liệu đăng ký
     */
    private validateRegisterData;
    /**
     * Validate dữ liệu đăng nhập
     */
    private validateLoginData;
    /**
     * Đăng ký tài khoản mới
     */
    register(userData: RegisterData): Promise<UserResponse>;
    /**
     * Đăng nhập
     */
    login(credentials: LoginData): Promise<UserResponse>;
    /**
     * Lấy thông tin user theo ID
     */
    getUserById(id_nguoi_dung: number): Promise<UserResponse | null>;
    /**
     * Thay đổi mật khẩu
     */
    changePassword(id_nguoi_dung: number, mat_khau_cu: string, mat_khau_moi: string): Promise<void>;
}
declare const _default: AuthService;
export default _default;
//# sourceMappingURL=AuthService.d.ts.map