import bcrypt from 'bcrypt';
import { nguoi_dung_vai_tro } from '@prisma/client';
import authRepository from '../repositories/AuthRepo';

/**
 * Service layer cho Authentication
 * Xử lý business logic và validation
 */

const VALID_ROLES: nguoi_dung_vai_tro[] = ['quan_ly', 'phu_huynh', 'tai_xe'];
const SALT_ROUNDS = 10;
const MIN_PASSWORD_LENGTH = 6;

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

export class AuthService {
  /**
   * Validate dữ liệu đăng ký
   */
  private validateRegisterData(data: RegisterData): void {
    const { ho_ten, ten_tai_khoan, mat_khau, vai_tro } = data;

    if (!ho_ten || !ten_tai_khoan || !mat_khau || !vai_tro) {
      throw new Error('Vui lòng nhập đầy đủ thông tin: họ tên, tên tài khoản, mật khẩu và vai trò');
    }

    if (!VALID_ROLES.includes(vai_tro)) {
      throw new Error(`Vai trò không hợp lệ. Chỉ chấp nhận: ${VALID_ROLES.join(', ')}`);
    }

    if (mat_khau.length < MIN_PASSWORD_LENGTH) {
      throw new Error(`Mật khẩu phải có ít nhất ${MIN_PASSWORD_LENGTH} ký tự`);
    }

    // Validate tên tài khoản (chỉ cho phép chữ cái, số và dấu gạch dưới)
    const usernameRegex = /^[a-zA-Z0-9_]{3,50}$/;
    if (!usernameRegex.test(ten_tai_khoan)) {
      throw new Error('Tên tài khoản phải từ 3-50 ký tự và chỉ chứa chữ cái, số, dấu gạch dưới');
    }

    // Validate số điện thoại nếu có
    if (data.so_dien_thoai) {
      const phoneRegex = /^[0-9]{10,11}$/;
      if (!phoneRegex.test(data.so_dien_thoai)) {
        throw new Error('Số điện thoại không hợp lệ (10-11 chữ số)');
      }
    }
  }

  /**
   * Validate dữ liệu đăng nhập
   */
  private validateLoginData(data: LoginData): void {
    const { ten_tai_khoan, mat_khau } = data;

    if (!ten_tai_khoan || !mat_khau) {
      throw new Error('Vui lòng nhập đầy đủ tên tài khoản và mật khẩu');
    }
  }

  /**
   * Đăng ký tài khoản mới
   */
  async register(userData: RegisterData): Promise<UserResponse> {
    // Validate input
    this.validateRegisterData(userData);

    // Kiểm tra tên tài khoản đã tồn tại
    const usernameExists = await authRepository.isUsernameExists(userData.ten_tai_khoan);
    if (usernameExists) {
      throw new Error('Tên tài khoản đã tồn tại');
    }

    // Kiểm tra số điện thoại đã tồn tại (nếu có)
    if (userData.so_dien_thoai) {
      const phoneExists = await authRepository.isPhoneExists(userData.so_dien_thoai);
      if (phoneExists) {
        throw new Error('Số điện thoại đã được sử dụng');
      }
    }

    // Băm mật khẩu
    const mat_khau_bam = await bcrypt.hash(userData.mat_khau, SALT_ROUNDS);

    // Tạo user mới
    const newUser = await authRepository.createUser({
      ho_ten: userData.ho_ten,
      ten_tai_khoan: userData.ten_tai_khoan,
      mat_khau_bam,
      so_dien_thoai: userData.so_dien_thoai,
      vai_tro: userData.vai_tro,
    });

    // Trả về thông tin user (không bao gồm password)
    return {
      id_nguoi_dung: newUser.id_nguoi_dung,
      ho_ten: newUser.ho_ten,
      ten_tai_khoan: newUser.ten_tai_khoan,
      vai_tro: newUser.vai_tro,
      so_dien_thoai: newUser.so_dien_thoai,
      ngay_tao: newUser.ngay_tao,
    };
  }

  /**
   * Đăng nhập
   */
  async login(credentials: LoginData): Promise<UserResponse> {
    // Validate input
    this.validateLoginData(credentials);

    // Tìm user trong database
    const user = await authRepository.findUserByUsername(credentials.ten_tai_khoan);
    if (!user) {
      throw new Error('Tên tài khoản hoặc mật khẩu không đúng');
    }

    // So sánh mật khẩu
    const isPasswordValid = await bcrypt.compare(credentials.mat_khau, user.mat_khau_bam);
    if (!isPasswordValid) {
      throw new Error('Tên tài khoản hoặc mật khẩu không đúng');
    }

    // Trả về thông tin user (không bao gồm password)
    return {
      id_nguoi_dung: user.id_nguoi_dung,
      ho_ten: user.ho_ten,
      ten_tai_khoan: user.ten_tai_khoan,
      vai_tro: user.vai_tro,
      so_dien_thoai: user.so_dien_thoai,
    };
  }

  /**
   * Lấy thông tin user theo ID
   */
  async getUserById(id_nguoi_dung: number): Promise<UserResponse | null> {
    const user = await authRepository.findUserById(id_nguoi_dung);
    if (!user) {
      return null;
    }

    return {
      id_nguoi_dung: user.id_nguoi_dung,
      ho_ten: user.ho_ten,
      ten_tai_khoan: user.ten_tai_khoan,
      vai_tro: user.vai_tro,
      so_dien_thoai: user.so_dien_thoai,
      ngay_tao: user.ngay_tao,
    };
  }

  /**
   * Thay đổi mật khẩu
   */
  async changePassword(id_nguoi_dung: number, mat_khau_cu: string, mat_khau_moi: string): Promise<void> {
    if (mat_khau_moi.length < MIN_PASSWORD_LENGTH) {
      throw new Error(`Mật khẩu mới phải có ít nhất ${MIN_PASSWORD_LENGTH} ký tự`);
    }

    const user = await authRepository.findUserByUsername(''); // Cần implement findById with password
    if (!user) {
      throw new Error('Người dùng không tồn tại');
    }

    const isPasswordValid = await bcrypt.compare(mat_khau_cu, user.mat_khau_bam);
    if (!isPasswordValid) {
      throw new Error('Mật khẩu cũ không đúng');
    }

    // Hash mật khẩu mới và cập nhật (cần implement updatePassword trong repository)
    // const mat_khau_bam_moi = await bcrypt.hash(mat_khau_moi, SALT_ROUNDS);
    // await authRepository.updatePassword(id_nguoi_dung, mat_khau_bam_moi);
  }
}

export default new AuthService();
