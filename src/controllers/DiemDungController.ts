import { Request, Response } from 'express';
import DiemDungService from '../services/DiemDungService';

export class DiemDungController {
  async getAll(req: Request, res: Response) {
    try {
      const data = await DiemDungService.getAll();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi server khi lấy danh sách điểm dừng' });
    }
  }

  async getById(req: Request, res: Response) {
    const idParam = req.params.id;
    if (!idParam) return res.status(400).json({ message: 'Thiếu tham số id' });
    const id = parseInt(idParam as string, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Tham số id không hợp lệ' });
    }

    try {
      const data = await DiemDungService.getById(id);
      if (!data) return res.status(404).json({ message: 'Không tìm thấy điểm dừng' });
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi server khi lấy điểm dừng' });
    }
  }
}

export default new DiemDungController();
