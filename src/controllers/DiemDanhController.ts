import { Request, Response } from 'express';
import DiemDanhService from '../services/DiemDanhService';

export class DiemDanhController {
  async updateTrangThai(req: Request, res: Response) {
    // Accept id from params or body for flexibility
    const idParam = req.params.id ?? req.body?.id_diem_danh;
    const statusParam = req.body?.trang_thai;

    if (idParam == null || statusParam == null) {
      return res.status(400).json({ message: 'Thiếu id_diem_danh hoặc trang_thai' });
    }

    const id = parseInt(String(idParam), 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'ID không hợp lệ' });
    }

    try {
      const result = await DiemDanhService.updateTrangThai(id, String(statusParam));
      if (result.type === 'not_found') {
        return res.status(404).json({ message: 'Không tìm thấy bản ghi điểm danh' });
      }
      return res.json({ message: 'Cập nhật trạng thái điểm danh thành công', data: result.record });
    } catch (error: any) {
      console.error(error);
      return res.status(400).json({ message: error.message || 'Lỗi khi cập nhật trạng thái điểm danh' });
    }
  }
}

export default new DiemDanhController();
