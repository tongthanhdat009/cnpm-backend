import { Request, Response } from "express";
import { TuyenDuongService } from "../services/TuyenDuongService";

const service = new TuyenDuongService();

export class TuyenDuongController {
  static async getAll(req: Request, res: Response) {
    try {
      const data = await service.getAll();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi server khi lấy tuyến đường" });
    }
  }
}
