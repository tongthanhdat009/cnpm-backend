import DiemDanhRepo from '../repositories/DiemDanhRepo';
import { diem_danh_chuyen_di_trang_thai } from '@prisma/client';

export class DiemDanhService {
  private repo = DiemDanhRepo;

  async updateTrangThai(id_diem_danh: number, trang_thai: string) {
    // Validate id
    if (!Number.isInteger(id_diem_danh) || id_diem_danh <= 0) {
      throw new Error('ID điểm danh không hợp lệ');
    }

    // Validate status against enum
    const allowed = new Set(Object.values(diem_danh_chuyen_di_trang_thai));
    if (!allowed.has(trang_thai as diem_danh_chuyen_di_trang_thai)) {
      throw new Error('Trạng thái không hợp lệ');
    }

    // Business rule: chỉ cho phép điểm danh khi chuyến đi đang ở trạng thái 'dang_di'
    const att = await this.repo.findByIdWithTripStatus(id_diem_danh);
    if (!att) return { type: 'not_found' as const };
    if (!att.chuyen_di || att.chuyen_di.trang_thai !== 'dang_di') {
      throw new Error('Chỉ được điểm danh khi chuyến đi đang ở trạng thái "dang_di"');
    }

    const updated = await this.repo.updateTrangThai(
      id_diem_danh,
      trang_thai as diem_danh_chuyen_di_trang_thai
    );

    if (!updated) return { type: 'not_found' as const };

    return { type: 'updated' as const, record: updated };
  }
}

export default new DiemDanhService();
