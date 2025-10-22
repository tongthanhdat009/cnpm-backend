import { Request, Response } from "express";
import TuyenDuongService from '../services/TuyenDuongService';


export class TuyenDuongController {
  async getAll(req: Request, res: Response) {
    try {
      const data = await TuyenDuongService.getAll();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi server khi lấy tuyến đường" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const data = await TuyenDuongService.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi server khi tạo tuyến đường" });
    }
  }
  
  async getTuyenDuongById(req: Request, res: Response) {
    if(!req.params.id){
      return res.status(400).json({ message: "Thiếu tham số id" });
    }
    const id = parseInt(req.params.id, 10);
    try {
      const data = await TuyenDuongService.getTuyenDuongById(id);
      if (!data) {
        return res.status(404).json({ message: "Không tìm thấy tuyến đường" });
      }
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi server khi lấy tuyến đường" });
    }
  }

  async getThoiLuongDuKien(req: Request, res: Response) {
    if (!req.params.id) {
      return res.status(400).json({ message: "Thiếu tham số id" });
    }
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID không hợp lệ" });
    }

    try {
      const data = await TuyenDuongService.getThoiLuongDuKien(id);
      res.json(data);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ 
        message: error.message || "Lỗi server khi tính thời lượng dự kiến" 
      });
    }
  }
}

export default new TuyenDuongController();