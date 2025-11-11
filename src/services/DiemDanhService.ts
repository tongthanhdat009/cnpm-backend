import DiemDanhRepo from '../repositories/DiemDanhRepo';
import { diem_danh_chuyen_di_trang_thai } from '@prisma/client';
import ThongBaoService from './ThongBaoService';

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

    // Gửi thông báo cho phụ huynh qua WebSocket VÀ lưu vào database
    try {
      const { sendMessageToUser } = await import('../websocket');
      
      if (updated.hoc_sinh?.id_phu_huynh) {
        const parentId = updated.hoc_sinh.id_phu_huynh;
        const statusText = this.getStatusText(updated.trang_thai);
        
        // Tạo nội dung thông báo
        const tieuDe = `📍 Điểm danh: ${updated.hoc_sinh.ho_ten}`;
        const noiDung = `Con bạn đã được điểm danh với trạng thái "${statusText}" lúc ${new Date(updated.thoi_gian).toLocaleTimeString('vi-VN')} - ${att.chuyen_di?.tuyen_duong?.ten_tuyen_duong || 'Tuyến không xác định'}`;
        
        // Lưu thông báo vào database
        const currentUser = updated.chuyen_di?.id_tai_xe; // ID tài xế
        await ThongBaoService.createThongBao({
          tieu_de: tieuDe,
          noi_dung: noiDung,
          nguoi_dung_thong_bao_id_nguoi_guiTonguoi_dung: currentUser ? {
            connect: { id_nguoi_dung: currentUser }
          } : undefined,
          nguoi_dung_thong_bao_id_nguoi_nhanTonguoi_dung: {
            connect: { id_nguoi_dung: parentId }
          },
          da_xem: false,
          thoi_gian: new Date()
        });

        // Gửi WebSocket message (realtime)
        const message = {
          type: 'attendance_update',
          data: {
            id_diem_danh: updated.id_diem_danh,
            ten_hoc_sinh: updated.hoc_sinh.ho_ten,
            trang_thai: updated.trang_thai,
            trang_thai_text: statusText,
            thoi_gian: updated.thoi_gian,
            id_chuyen_di: updated.id_chuyen_di,
            loai_chuyen_di: att.chuyen_di?.loai_chuyen_di,
            ten_tuyen_duong: att.chuyen_di?.tuyen_duong?.ten_tuyen_duong || 'Không xác định'
          }
        };
        
        sendMessageToUser(parentId, message);
        console.log(`📨 Đã gửi và lưu thông báo điểm danh cho phụ huynh ID: ${parentId}`);
      }
    } catch (error) {
      console.error('Lỗi khi gửi/lưu thông báo:', error);
      // Không throw error để không ảnh hưởng đến việc cập nhật điểm danh
    }

    return { type: 'updated' as const, record: updated };
  }

  private getStatusText(status: diem_danh_chuyen_di_trang_thai): string {
    const statusMap = {
      'da_don': 'Đã đón',
      'da_tra': 'Đã trả',
      'vang_mat': 'Vắng mặt',
      'chua_don': 'Chưa cập nhật'
    };
    return statusMap[status] || status;
  }
}

export default new DiemDanhService();
