import { XeBuytService } from "../services/XeBuytService";
import { Request, Response } from "express";

export class XeBuytController {
    private service: XeBuytService;

    constructor() {
        this.service = new XeBuytService();
    }

    // Lấy tất cả xe buýt
    async getAllXeBuyt(req: Request, res: Response) {
        try {
            const result = await this.service.getAllXeBuyt();
            return res.status(result.success ? 200 : 400).json(result);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Lỗi máy chủ",
                error: (err as Error).message,
            });
        }
    }

    // Lấy xe buýt theo ID
    async getXeBuytById(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: "Thiếu tham số ID" });
        }

        const idNumber = parseInt(id, 10);
        if (Number.isNaN(idNumber)) {
            return res.status(400).json({ success: false, message: "ID không hợp lệ" });
        }

        try {
            const result = await this.service.getXeBuytById(idNumber);
            return res.status(result.success ? 200 : 404).json(result);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Lỗi máy chủ",
                error: (err as Error).message,
            });
        }
    }

    // Tạo mới xe buýt
    async createXeBuyt(req: Request, res: Response) {
        try {
            const result = await this.service.createXeBuyt(req.body);
            return res.status(result.success ? 201 : 400).json(result);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Lỗi máy chủ khi tạo xe buýt",
                error: (err as Error).message,
            });
        }
    }

    // Cập nhật xe buýt
    async updateXeBuyt(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: "Thiếu tham số ID" });
        }

        const idNumber = parseInt(id, 10);
        if (Number.isNaN(idNumber)) {
            return res.status(400).json({ success: false, message: "ID không hợp lệ" });
        }

        try {
            const result = await this.service.updateXeBuyt(idNumber, req.body);
            return res.status(result.success ? 200 : 400).json(result);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Lỗi máy chủ khi cập nhật xe buýt",
                error: (err as Error).message,
            });
        }
    }

    // Xóa xe buýt
    async deleteXeBuyt(req: Request, res: Response) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ success: false, message: "Thiếu tham số ID" });
        }

        const idNumber = parseInt(id, 10);
        if (Number.isNaN(idNumber)) {
            return res.status(400).json({ success: false, message: "ID không hợp lệ" });
        }

        try {
            const result = await this.service.deleteXeBuyt(idNumber);
            return res.status(result.success ? 200 : 400).json(result);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Lỗi máy chủ khi xóa xe buýt",
                error: (err as Error).message,
            });
        }
    }
}

export default new XeBuytController();
