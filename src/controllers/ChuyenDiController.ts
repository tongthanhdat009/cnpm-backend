import { Request, Response } from "express";
import { ChuyenDiService } from "../services/ChuyenDiService";

export class ChuyenDiController {
    private service: ChuyenDiService;
    
    constructor() {
        this.service = new ChuyenDiService();
    }

    /**
     * GET /api/v1/chuyen-di
     * Lấy tất cả chuyến đi hoặc lọc theo query params
     * Query: tai_xe, tuyen_duong, ngay, trang_thai
     */
    async getAllChuyenDi(req: Request, res: Response) {
        try {
            const { tai_xe, tuyen_duong, ngay, trang_thai } = req.query;

            let result;

            // Lọc theo tài xế
            if (tai_xe) {
                const idTaiXe = parseInt(tai_xe as string);
                if (isNaN(idTaiXe)) {
                    return res.status(400).json({
                        success: false,
                        message: "ID tài xế không hợp lệ"
                    });
                }
                result = await this.service.getChuyenDiByTaiXe(idTaiXe);
            }
            // Lọc theo tuyến đường
            else if (tuyen_duong) {
                const idTuyenDuong = parseInt(tuyen_duong as string);
                if (isNaN(idTuyenDuong)) {
                    return res.status(400).json({
                        success: false,
                        message: "ID tuyến đường không hợp lệ"
                    });
                }
                result = await this.service.getChuyenDiByTuyenDuong(idTuyenDuong);
            }
            // Lọc theo ngày
            else if (ngay) {
                const date = new Date(ngay as string);
                if (isNaN(date.getTime())) {
                    return res.status(400).json({
                        success: false,
                        message: "Ngày không hợp lệ (format: YYYY-MM-DD)"
                    });
                }
                result = await this.service.getChuyenDiByNgay(date);
            }
            // Lọc theo trạng thái
            else if (trang_thai) {
                const validStates = ['cho_khoi_hanh', 'dang_di', 'hoan_thanh', 'da_huy', 'bi_tre'];
                if (!validStates.includes(trang_thai as string)) {
                    return res.status(400).json({
                        success: false,
                        message: `Trạng thái không hợp lệ. Chỉ chấp nhận: ${validStates.join(', ')}`
                    });
                }
                result = await this.service.getChuyenDiByTrangThai(trang_thai as any);
            }
            // Lấy tất cả
            else {
                result = await this.service.getAllChuyenDi();
            }

            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(400).json(result);
            }
        } catch (error: any) {
            console.error("Error in getAllChuyenDi controller:", error);
            return res.status(500).json({
                success: false,
                message: "Lỗi server khi lấy danh sách chuyến đi",
                error: error.message
            });
        }
    }

    /**
     * GET /api/v1/chuyen-di/:id
     * Lấy chi tiết chuyến đi theo ID
     */
    async getChuyenDiById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            
            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "Thiếu ID chuyến đi"
                });
            }
            
            const idNumber = parseInt(id);

            if (isNaN(idNumber)) {
                return res.status(400).json({
                    success: false,
                    message: "ID chuyến đi không hợp lệ"
                });
            }

            const result = await this.service.getChuyenDiById(idNumber);

            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json(result);
            }
        } catch (error: any) {
            console.error("Error in getChuyenDiById controller:", error);
            return res.status(500).json({
                success: false,
                message: "Lỗi server khi lấy thông tin chuyến đi",
                error: error.message
            });
        }
    }
}

export default new ChuyenDiController();