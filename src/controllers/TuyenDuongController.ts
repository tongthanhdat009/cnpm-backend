import { Request, Response } from "express";
import TuyenDuongService from '../services/TuyenDuongService';


export class TuyenDuongController {
  static async getAll(req: Request, res: Response) {
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
}
