import { Request, Response } from 'express';
import DiemDungService from '../services/DiemDungService';

export class DiemDungController {
  async getAll(req: Request, res: Response) {
    try {
      const data = await DiemDungService.getAll({ q: req.query.q as string | undefined });
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

  async getUnassignedCounts(req: Request, res: Response) {
    try {
      const data = await DiemDungService.getUnassignedStudentCounts();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi server khi lấy số lượng học sinh chưa phân công' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const result = await DiemDungService.create(req.body);
      if (!result.success) return res.status(400).json(result);
      res.json(result);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi server khi tạo điểm dừng' });
    }
  }

  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id as string, 10);
    if (Number.isNaN(id)) return res.status(400).json({ message: 'Id không hợp lệ' });
    try {
      const result = await DiemDungService.update(id, req.body);
      if (!result.success) return res.status(400).json(result);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi server khi cập nhật điểm dừng' });
    }
  }

  async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id as string, 10);
    if (Number.isNaN(id)) return res.status(400).json({ message: 'Id không hợp lệ' });
    try {
      const result = await DiemDungService.remove(id);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi server khi xóa điểm dừng' });
    }
  }
}

export default new DiemDungController();
