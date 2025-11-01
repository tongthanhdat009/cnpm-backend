import bcrypt from 'bcrypt';
import { nguoi_dung_vai_tro } from '@prisma/client';
import authRepository from '../repositories/AuthRepo';
import { NguoiDungRepository } from '../repositories/NguoiDungRepo';
import { ChuyenDiRepository } from '../repositories/ChuyenDiRepo';
import authService, { RegisterData } from './AuthService';

const SALT_ROUNDS = 10;

export class TaiXeService {
  private nguoiDungRepo: NguoiDungRepository;
  private chuyenDiRepo: ChuyenDiRepository;

  constructor() {
    this.nguoiDungRepo = new NguoiDungRepository();
    this.chuyenDiRepo = new ChuyenDiRepository();
  }

  async getAllTaiXe() {
    try {
      const data = await this.nguoiDungRepo.getNguoiDungByVaiTro('tai_xe' as any);
      console.debug('[TaiXeService] getAllTaiXe returned count:', data?.length ?? 0);
      return { success: true, message: 'Lấy danh sách tài xế thành công', data, total: data.length };
    } catch (err: any) {
      console.error('[TaiXeService] getAllTaiXe error:', err?.message ?? err);
      return { success: false, message: 'Lỗi khi lấy danh sách tài xế', error: err.message };
    }
  }

  async getTaiXeById(id: number) {
    try {
      const user = await this.nguoiDungRepo.getNguoiDungById(id);
      if (!user) return { success: false, message: 'Tài xế không tồn tại' };
      if (user.vai_tro !== 'tai_xe') return { success: false, message: 'Người dùng không phải tài xế' };
      return { success: true, message: 'Lấy tài xế thành công', data: user };
    } catch (err: any) {
      return { success: false, message: 'Lỗi khi lấy tài xế', error: err.message };
    }
  }

  async createTaiXe(payload: Omit<RegisterData, 'vai_tro'>) {
    try {
      // delegate to authService.register which handles validation and hashing
      const created = await authService.register({ ...payload, vai_tro: 'tai_xe' as nguoi_dung_vai_tro });
      return { success: true, message: 'Tạo tài xế thành công', data: created };
    } catch (err: any) {
      return { success: false, message: 'Lỗi khi tạo tài xế', error: err.message };
    }
  }

  async updateTaiXe(id: number, payload: Partial<{ ho_ten: string; ten_tai_khoan: string; mat_khau: string; so_dien_thoai: string }>) {
    try {
      // Validate input similarly to register
      // Ensure user exists and is a driver
      const existing = await authRepository.findUserById(id);
      if (!existing) return { success: false, message: 'Tài xế không tồn tại' };
      if (existing.vai_tro !== 'tai_xe') return { success: false, message: 'Người dùng không phải tài xế' };

      // Validation rules
      if (payload.ten_tai_khoan !== undefined && payload.ten_tai_khoan !== null) {
        const username = payload.ten_tai_khoan.trim();
        const usernameRegex = /^[a-zA-Z0-9_]{3,50}$/;
        if (!usernameRegex.test(username)) {
          return { success: false, message: 'Tên tài khoản không hợp lệ (3-50 ký tự, chỉ chữ/số/_)' };
        }
        // Check uniqueness if changed
        if (username !== existing.ten_tai_khoan) {
          const other = await authRepository.findUserByUsername(username);
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
          const otherByPhone = await authRepository.findUserByPhone(phone);
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
      const updateData: any = {};
      if (payload.ho_ten !== undefined) updateData.ho_ten = payload.ho_ten;
      if (payload.ten_tai_khoan !== undefined) updateData.ten_tai_khoan = payload.ten_tai_khoan;
      if (payload.so_dien_thoai !== undefined) updateData.so_dien_thoai = payload.so_dien_thoai ?? null;
      if (payload.mat_khau) {
        const mat_khau_bam = await bcrypt.hash(payload.mat_khau, SALT_ROUNDS);
        updateData.mat_khau_bam = mat_khau_bam;
      }

      console.debug('[TaiXeService] updateTaiXe id, updateData =>', { id, updateData });
      const updated = await authRepository.updateUser(id, updateData);
      console.debug('[TaiXeService] updateTaiXe updated =>', { id: updated?.id_nguoi_dung });
      return { success: true, message: 'Cập nhật tài xế thành công', data: updated };
    } catch (err: any) {
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

  async deleteTaiXe(id: number, replaceWithId?: number) {
    try {
      console.debug('[TaiXeService] deleteTaiXe id =>', id, 'replaceWithId =>', replaceWithId);

      // Check whether driver has any trips
      const trips = await this.chuyenDiRepo.getChuyenDiByTaiXe(id);
      if (trips && trips.length > 0) {
        // If no replacement provided, return trips and instruct client to provide replacement
        if (!replaceWithId) {
          return {
            success: false,
            message: 'Tài xế đang có lịch trình. Vui lòng chỉ định tài xế thay thế trước khi xóa.',
            data: trips,
            code: 'HAS_TRIPS'
          };
        }

        // Replacement provided — validate
        if (replaceWithId === id) {
          return { success: false, message: 'Tài xế thay thế không thể là chính tài xế này' };
        }
        const replacement = await authRepository.findUserById(replaceWithId);
        if (!replacement) {
          return { success: false, message: 'Tài xế thay thế không tồn tại' };
        }
        if (replacement.vai_tro !== 'tai_xe') {
          return { success: false, message: 'Người được chọn không phải là tài xế' };
        }

        // Check schedule conflicts: replacement must not have trips that conflict
        // Rule: conflict if same date (ngay) and same gio_khoi_hanh
        const replacementTrips = await this.chuyenDiRepo.getChuyenDiByTaiXe(replaceWithId);
        const conflicts: any[] = [];
        // Build quick index for replacement trips by ngay + gio_khoi_hanh
        const repIndex = new Map<string, any[]>();
        for (const rt of replacementTrips) {
          const key = `${new Date(rt.ngay).toDateString()}|${rt.gio_khoi_hanh}`;
          const arr = repIndex.get(key) || [];
          arr.push(rt);
          repIndex.set(key, arr);
        }
        for (const t of trips) {
          const key = `${new Date(t.ngay).toDateString()}|${t.gio_khoi_hanh}`;
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
            data: { conflicts, trips }
          };
        }

        // Reassign trips
        const reassignResult = await this.chuyenDiRepo.reassignChuyenDiTaiXe(id, replaceWithId);
        console.debug('[TaiXeService] reassignChuyenDiTaiXe result =>', reassignResult);
      }

      // Safe to delete (either had no trips, or reassign completed)
      await authRepository.deleteUser(id);
      console.debug('[TaiXeService] deleteTaiXe deleted id =>', id);
      return { success: true, message: 'Xóa tài xế thành công' };
    } catch (err: any) {
      console.error('[TaiXeService] deleteTaiXe error:', err?.message ?? err, err?.code ?? 'no-code');
      const code = err?.code ?? null;
      if (code === 'P2025') {
        return { success: false, message: 'Tài xế không tồn tại', error: err.message, code };
      }
      if (code === 'P2003') {
        // foreign key constraint failed — referenced elsewhere
        return { success: false, message: 'Không thể xóa tài xế vì bị tham chiếu bởi dữ liệu khác', error: err.message, code };
      }
      return { success: false, message: 'Lỗi khi xóa tài xế', error: err.message, code };
    }
  }
}

export default new TaiXeService();
