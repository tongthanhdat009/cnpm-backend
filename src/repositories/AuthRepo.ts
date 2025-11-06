import prisma from '../prisma/client';
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

export class AuthRepository {
  /**
   * Tìm người dùng theo tên tài khoản
   */
  async findUserByUsername(ten_tai_khoan: string): Promise<any | null> {
    return await prisma.nguoi_dung.findUnique({
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
  async findUserById(id_nguoi_dung: number): Promise<any | null> {
    return await prisma.nguoi_dung.findUnique({
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
  async isUsernameExists(ten_tai_khoan: string): Promise<boolean> {
    const user = await prisma.nguoi_dung.findUnique({
      where: { ten_tai_khoan },
      select: { id_nguoi_dung: true },
    });
    return user !== null;
  }

  /**
   * Kiểm tra số điện thoại đã tồn tại
   */
  async isPhoneExists(so_dien_thoai: string): Promise<boolean> {
    const user = await prisma.nguoi_dung.findUnique({
      where: { so_dien_thoai },
      select: { id_nguoi_dung: true },
    });
    return user !== null;
  }

  /**
   * Tìm người dùng theo số điện thoại
   */
  async findUserByPhone(so_dien_thoai: string): Promise<any | null> {
    return await prisma.nguoi_dung.findUnique({
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
  async createUser(userData: CreateUserData): Promise<nguoi_dung> {
    return await prisma.nguoi_dung.create({
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
  async countUsersByRole(vai_tro: nguoi_dung_vai_tro): Promise<number> {
    return await prisma.nguoi_dung.count({
      where: { vai_tro },
    });
  }

  /**
   * Lấy danh sách tất cả người dùng (dùng cho admin)
   */
  async getAllUsers(skip?: number, take?: number) {
    return await prisma.nguoi_dung.findMany({
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
  async updateUser(id_nguoi_dung: number, data: Partial<CreateUserData & { mat_khau_bam?: string }>) {
    // Build update payload only with provided fields to avoid sending undefined to Prisma
    const updatePayload: any = {};
    if (data.ho_ten !== undefined) updatePayload.ho_ten = data.ho_ten;
    if (data.ten_tai_khoan !== undefined) updatePayload.ten_tai_khoan = data.ten_tai_khoan;
    if (data.mat_khau_bam !== undefined) updatePayload.mat_khau_bam = data.mat_khau_bam;
    if (data.so_dien_thoai !== undefined) updatePayload.so_dien_thoai = data.so_dien_thoai ?? null;

    try {
      console.debug('[AuthRepo] updateUser id, payload =>', { id_nguoi_dung, updatePayload });
      return await prisma.nguoi_dung.update({
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
    } catch (err: any) {
      console.error('[AuthRepo] updateUser error:', err?.message ?? err, err?.code ?? 'no-code');
      throw err;
    }
  }

  /**
   * Xóa người dùng
   */
  async deleteUser(id_nguoi_dung: number) {
    return await prisma.nguoi_dung.delete({
      where: { id_nguoi_dung },
    });
  }
}

export default new AuthRepository();
