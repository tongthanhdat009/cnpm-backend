import bcrypt from 'bcrypt';
import { nguoi_dung_vai_tro } from '@prisma/client';
import authRepository from '../repositories/AuthRepo';
import { NguoiDungRepository } from '../repositories/NguoiDungRepo';
import { ChuyenDiRepository } from '../repositories/ChuyenDiRepo';
import authService, { RegisterData } from './AuthService';
import { formatVietnamTime } from '../utils/timezone';
import prisma from '../prisma/client';

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
      // Normalize input then delegate to authService.register which handles validation and hashing
      const ho_ten = (payload.ho_ten ?? '').trim();
      const ten_tai_khoan = (payload.ten_tai_khoan ?? '').trim();
      let so_dien_thoai = payload.so_dien_thoai ?? undefined;
      if (so_dien_thoai) {
        // Chuẩn hóa số điện thoại: bỏ ký tự không phải số, chuyển +84xxx -> 0xxx
        const digits = so_dien_thoai.replace(/\D+/g, '');
        if (digits.startsWith('84') && digits.length >= 11) {
          so_dien_thoai = '0' + digits.slice(2);
        } else {
          so_dien_thoai = digits;
        }
      }
      const created = await authService.register({
        ho_ten,
        ten_tai_khoan,
        mat_khau: payload.mat_khau,
        so_dien_thoai,
        vai_tro: 'tai_xe' as nguoi_dung_vai_tro
      });
      return { success: true, message: 'Tạo tài xế thành công', data: created };
    } catch (err: any) {
      console.error('[TaiXeService] createTaiXe error:', err?.message ?? err);
      // Surface underlying validation/business message to client
      return { success: false, message: err?.message || 'Lỗi khi tạo tài xế', error: err?.message };
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

      // Check whether driver has any FUTURE or TODAY trips (VN time)
      const trips = await this.chuyenDiRepo.getChuyenDiByTaiXe(id);
      const todayVN = formatVietnamTime(new Date(), 'date'); // YYYY-MM-DD in VN
      const isOnOrAfterToday = (d: Date) => formatVietnamTime(d, 'date') >= todayVN;
      const futureOrTodayTrips = (trips || []).filter((t: any) => isOnOrAfterToday(t.ngay));

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
        const replacement = await authRepository.findUserById(replaceWithId);
        if (!replacement) {
          return { success: false, message: 'Tài xế thay thế không tồn tại' };
        }
        if (replacement.isDelete) {
          return { success: false, message: 'Tài xế thay thế đã ngừng hoạt động' };
        }
        if (replacement.vai_tro !== 'tai_xe') {
          return { success: false, message: 'Người được chọn không phải là tài xế' };
        }

        // Check schedule conflicts: replacement must not have trips that conflict
        // Rule: conflict if same date (ngay) and start time difference < 30 minutes
        const replacementTripsAll = await this.chuyenDiRepo.getChuyenDiByTaiXe(replaceWithId);
        const replacementTrips = (replacementTripsAll || []).filter((t: any) => isOnOrAfterToday(t.ngay));
        const conflicts: any[] = [];
        
        const getMinutes = (d: Date) => {
            const dateObj = new Date(d);
            return dateObj.getUTCHours() * 60 + dateObj.getUTCMinutes();
        };

        for (const t of futureOrTodayTrips) {
          const tDate = formatVietnamTime(t.ngay, 'date');
          const tMinutes = getMinutes(t.gio_khoi_hanh);

          const matched = replacementTrips.filter((rt: any) => {
            const rtDate = formatVietnamTime(rt.ngay, 'date');
            if (rtDate !== tDate) return false;
            
            const rtMinutes = getMinutes(rt.gio_khoi_hanh);
            return Math.abs(tMinutes - rtMinutes) < 30;
          });

          if (matched.length > 0) {
            conflicts.push({ reassignTrip: t, with: matched });
          }
        }
        if (conflicts.length > 0) {
          return {
            success: false,
            message: 'Tài xế thay thế đang có lịch trình trùng hoặc quá sát (dưới 30 phút). Vui lòng chọn tài xế khác.',
            code: 'REPLACE_CONFLICT',
            data: { conflicts, trips: futureOrTodayTrips }
          };
        }

        // Reassign ONLY future/today trips
        for (const trip of futureOrTodayTrips) {
          await prisma.chuyen_di.update({
            where: { id_chuyen_di: trip.id_chuyen_di },
            data: { id_tai_xe: replaceWithId }
          });
        }
        console.debug('[TaiXeService] reassignChuyenDiTaiXe (future only) count =>', futureOrTodayTrips.length);
      }

      // Soft delete: mark user isDelete = true instead of removing references
      const updated = await prisma.nguoi_dung.update({
        where: { id_nguoi_dung: id },
        data: { isDelete: true }
      });
      console.debug('[TaiXeService] soft-deleted driver id =>', id);
      return { success: true, message: 'Xóa mềm tài xế thành công', data: { id, ho_ten: updated.ho_ten } };
    } catch (err: any) {
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

  async restoreTaiXe(id: number) {
    try {
      const user = await this.nguoiDungRepo.getNguoiDungById(id);
      if (!user) return { success: false, message: 'Tài xế không tồn tại' };
      
      // Restore: mark user isDelete = false
      const updated = await prisma.nguoi_dung.update({
        where: { id_nguoi_dung: id },
        data: { isDelete: false }
      });
      console.debug('[TaiXeService] restored driver id =>', id);
      return { success: true, message: 'Phục hồi tài xế thành công', data: { id, ho_ten: updated.ho_ten } };
    } catch (err: any) {
      console.error('[TaiXeService] restoreTaiXe error:', err?.message ?? err);
      return { success: false, message: 'Lỗi khi phục hồi tài xế', error: err.message };
    }
  }
}

export default new TaiXeService();
