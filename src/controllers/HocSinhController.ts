import { Request, Response } from 'express';
import HocSinhService from '../services/HocSinhService';
import prisma from '../prisma/client';

class HocSinhController {
  // Lấy tất cả học sinh
  async getAll(req: Request, res: Response) {
    try {
      const data = await HocSinhService.getAll();
      res.json({ success: true, data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Lỗi server khi lấy danh sách học sinh' });
    }
  }

  // Lấy học sinh theo ID
  async getById(req: Request, res: Response) {
    const idParam = req.params.id;
    if (!idParam) return res.status(400).json({ success: false, message: 'Thiếu tham số id' });

    const id = parseInt(idParam, 10);
    if (Number.isNaN(id)) return res.status(400).json({ success: false, message: 'Tham số id không hợp lệ' });

    try {
      const data = await HocSinhService.getById(id);
      if (!data) return res.status(404).json({ success: false, message: 'Không tìm thấy học sinh' });
      res.json({ success: true, data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Lỗi server khi lấy học sinh' });
    }
  }

  // Lấy học sinh theo phụ huynh
  async getByPhuHuynh(req: Request, res: Response) {
    const idParam = req.params.idPhuHuynh;
    if (!idParam) return res.status(400).json({ success: false, message: 'Thiếu tham số idPhuHuynh' });

    const idPhuHuynh = parseInt(idParam, 10);
    if (Number.isNaN(idPhuHuynh)) return res.status(400).json({ success: false, message: 'Tham số idPhuHuynh không hợp lệ' });

    try {
      const data = await HocSinhService.getByPhuHuynh(idPhuHuynh);
      res.json({ success: true, data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Lỗi server khi lấy học sinh theo phụ huynh' });
    }
  }

  // Tạo học sinh mới
  async create(req: Request, res: Response) {
    try {
      const { ho_ten, lop, ghi_chu } = req.body;
      let { id_phu_huynh, id_diem_dung } = req.body;

      if (!ho_ten || id_phu_huynh === undefined || id_phu_huynh === null || id_phu_huynh === '') {
        return res.status(400).json({ success: false, message: 'Thiếu thông tin bắt buộc' });
      }

      // Coerce numeric fields
      id_phu_huynh = Number(id_phu_huynh);
      if (Number.isNaN(id_phu_huynh)) return res.status(400).json({ success: false, message: 'id_phu_huynh không hợp lệ' });

      if (id_diem_dung !== undefined && id_diem_dung !== null && id_diem_dung !== '') {
        id_diem_dung = Number(id_diem_dung);
        if (Number.isNaN(id_diem_dung)) id_diem_dung = null;
      } else {
        id_diem_dung = null;
      }

      // Verify parent exists to avoid FK constraint errors
      const parent = await prisma.nguoi_dung.findUnique({ where: { id_nguoi_dung: id_phu_huynh } });
      if (!parent) return res.status(400).json({ success: false, message: 'Phụ huynh không tồn tại' });

      const newStudent = await HocSinhService.create({
        ho_ten,
        lop,
        ghi_chu,
        id_phu_huynh,
        id_diem_dung,
      });

      res.status(201).json({ success: true, data: newStudent });
    } catch (error) {
      console.error('HocSinhController.create error:', error);
      // If it's a Prisma error, provide code in logs but keep client message generic.
      res.status(500).json({ success: false, message: 'Lỗi server khi tạo học sinh' });
    }
  }

  // Cập nhật học sinh theo ID
  async update(req: Request, res: Response) {
    const idParam = req.params.id;
    if (!idParam) return res.status(400).json({ success: false, message: 'Thiếu tham số id' });

    const id = parseInt(idParam, 10);
    if (Number.isNaN(id)) return res.status(400).json({ success: false, message: 'ID không hợp lệ' });

    try {
      const { ho_ten, lop, ghi_chu } = req.body;
      let { id_phu_huynh, id_diem_dung } = req.body;

      if (id_phu_huynh !== undefined && id_phu_huynh !== null && id_phu_huynh !== '') {
        id_phu_huynh = Number(id_phu_huynh);
        if (Number.isNaN(id_phu_huynh)) return res.status(400).json({ success: false, message: 'id_phu_huynh không hợp lệ' });
      }

      if (id_diem_dung !== undefined && id_diem_dung !== null && id_diem_dung !== '') {
        id_diem_dung = Number(id_diem_dung);
        if (Number.isNaN(id_diem_dung)) id_diem_dung = null;
      } else {
        id_diem_dung = null;
      }

      const updatedStudent = await HocSinhService.update(id, {
        ho_ten,
        lop,
        ghi_chu,
        id_phu_huynh,
        id_diem_dung,
      });

      res.json({ success: true, data: updatedStudent });
    } catch (error) {
      console.error('HocSinhController.update error:', error);
      res.status(500).json({ success: false, message: 'Lỗi server khi cập nhật học sinh' });
    }
  }

  // Xóa học sinh theo ID
  async delete(req: Request, res: Response) {
    const idParam = req.params.id;
    if (!idParam) return res.status(400).json({ success: false, message: 'Thiếu tham số id' });

    const id = parseInt(idParam, 10);
    if (Number.isNaN(id)) return res.status(400).json({ success: false, message: 'ID không hợp lệ' });

    try {
      await HocSinhService.delete(id);
      res.json({ success: true, message: 'Xóa học sinh thành công' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Lỗi server khi xóa học sinh' });
    }
  }
}

export default new HocSinhController();
