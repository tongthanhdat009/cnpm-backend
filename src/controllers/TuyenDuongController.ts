import { Request, Response } from "express";
import { TuyenDuongService } from "../services/TuyenDuongService";

const service = new TuyenDuongService();

export class TuyenDuongController {
  async getAll(req: Request, res: Response) {
    try {
      const data = await service.getAll();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi server khi lấy tuyến đường" });
    }
  }
  async getTuyenDuongById(req: Request, res: Response) {
    if(!req.params.id){
      return res.status(400).json({ message: "Thiếu tham số id" });
    }
    const id = parseInt(req.params.id, 10);
    try {
      const data = await service.getTuyenDuongById(id);
      if (!data) {
        return res.status(404).json({ message: "Không tìm thấy tuyến đường" });
      }
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi server khi lấy tuyến đường" });
    }
  }
}

export default new TuyenDuongController();