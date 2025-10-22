import { Request, Response } from 'express';
import HocSinhService from '../services/HocSinhService';

export class HocSinhController {
  async getAll(req: Request, res: Response) {
    try {
      const data = await HocSinhService.getAll();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi server khi lấy danh sách học sinh' });
    }
  }

  async getById(req: Request, res: Response) {
    const idParam = req.params.id;
    if (!idParam) return res.status(400).json({ message: 'Thiếu tham số id' });
    const id = parseInt(idParam as string, 10);
    if (Number.isNaN(id)) return res.status(400).json({ message: 'Tham số id không hợp lệ' });

    try {
      const data = await HocSinhService.getById(id);
      if (!data) return res.status(404).json({ message: 'Không tìm thấy học sinh' });
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi server khi lấy học sinh' });
    }
  }
}

export default new HocSinhController();
