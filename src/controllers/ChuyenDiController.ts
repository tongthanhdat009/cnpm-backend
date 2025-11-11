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

    /**
     * GET /api/v1/chuyen-di/hoc-sinh/:idHocSinh
     * Lấy danh sách chuyến đi của một học sinh
     */
    async getChuyenDiByHocSinh(req: Request, res: Response) {
        try {
            const { idHocSinh } = req.params;
            
            if (!idHocSinh) {
                return res.status(400).json({
                    success: false,
                    message: "Thiếu ID học sinh"
                });
            }
            
            const idNumber = parseInt(idHocSinh);

            if (isNaN(idNumber)) {
                return res.status(400).json({
                    success: false,
                    message: "ID học sinh không hợp lệ"
                });
            }

            const result = await this.service.getChuyenDiByHocSinh(idNumber);

            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json(result);
            }
        } catch (error: any) {
            console.error("Error in getChuyenDiByHocSinh controller:", error);
            return res.status(500).json({
                success: false,
                message: "Lỗi server khi lấy danh sách chuyến đi của học sinh",
                error: error.message
            });
        }
    }

    async createRecurringChuyenDi(req: Request, res: Response) {
        try {
            const data: any = req.body;

            // Kiểm tra input cơ bản
            if (!data.id_tai_xe || !data.id_tuyen_duong || !data.id_xe_buyt || 
                !data.gio_khoi_hanh || !data.ngay_bat_dau || !data.ngay_ket_thuc ||
                !data.lap_lai_cac_ngay || data.lap_lai_cac_ngay.length === 0) 
            {
                return res.status(400).json({
                    success: false,
                    message: "Thiếu thông tin bắt buộc (lái xe, tuyến, xe, giờ, ngày bắt đầu/kết thúc, ngày lặp lại)"
                });
            }
            
            const result = await this.service.createRecurringChuyenDi(data);

            if (result.success) {
                return res.status(201).json(result); // 201 Created
            } else {
                // Nếu là lỗi trùng lịch (conflict)
                if (result.errors) {
                    return res.status(409).json(result); // 409 Conflict
                }
                // Nếu là lỗi dữ liệu đầu vào
                return res.status(400).json(result);
            }

        } catch (error: any) {
            console.error("Error in createRecurringChuyenDi controller:", error);
            return res.status(500).json({
                success: false,
                message: "Lỗi server khi tạo lịch trình",
                error: error.message
            });
        }
    }

    /**
     * PUT /api/v1/chuyen-di/:id
     * Cập nhật chuyến đi
     */
    async updateChuyenDi(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data: any = req.body;

            if (!id) {
                return res.status(400).json({ success: false, message: "Thiếu ID chuyến đi" });
            }

            const idNumber = parseInt(id);
            if (isNaN(idNumber)) {
                return res.status(400).json({ success: false, message: "ID chuyến đi không hợp lệ" });
            }
            
            // (SỬA) Kiểm tra nếu body rỗng
            if (Object.keys(data).length === 0) {
                 return res.status(400).json({
                    success: false,
                    message: "Không có dữ liệu nào được gửi để cập nhật."
                });
            }

            const result = await this.service.updateChuyenDi(idNumber, data);

            if (result.success) {
                return res.status(200).json(result);
            } else {
                // (SỬA) Xử lý lỗi trùng lịch
                if ('errors' in result && result.errors) {
                    return res.status(409).json(result); // 409 Conflict
                }
                // (SỬA) Xử lý lỗi không tìm thấy
                if (result.message && result.message.includes("Không tìm thấy")) {
                    return res.status(404).json(result); // 404 Not Found
                }
                // Các lỗi 400 khác (ví dụ: không thể sửa chuyến đã hoàn thành)
                return res.status(400).json(result);
            }
            
        } catch (error: any) {
            console.error("Error in updateChuyenDi controller:", error);
            return res.status(500).json({
                success: false,
                message: "Lỗi server khi cập nhật chuyến đi",
                error: error.message
            });
        }
    }

    async deleteChuyenDi(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ success: false, message: "Thiếu ID chuyến đi" });
            }
            const idNumber = parseInt(id);
            if (isNaN(idNumber)) {
                return res.status(400).json({ success: false, message: "ID chuyến đi không hợp lệ" });
            }
            const result = await this.service.deleteChuyenDi(idNumber);
            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json(result);
            }
        } catch (error: any) {
            console.error("Error in deleteChuyenDi controller:", error);
            return res.status(500).json({
                success: false,
                message: "Lỗi server khi xóa chuyến đi",
                error: error.message
            });
        }
    }

    /**
     * PATCH /api/v1/chuyen-di/:id/trang-thai
     * Cập nhật trạng thái chuyến đi; nếu chuyển sang 'hoan_thanh' -> auto đổi điểm danh 'da_don' => 'da_tra'
     */
    async updateTrangThai(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { trang_thai } = req.body as { trang_thai?: string };

            if (!id) return res.status(400).json({ success: false, message: 'Thiếu ID chuyến đi' });
            const idNumber = parseInt(String(id), 10);
            if (Number.isNaN(idNumber)) return res.status(400).json({ success: false, message: 'ID chuyến đi không hợp lệ' });
            if (!trang_thai) return res.status(400).json({ success: false, message: 'Thiếu trường trang_thai' });

            const result = await this.service.updateTrangThai(idNumber, trang_thai as any);
            if (!result.success && result.message?.includes('Không tìm thấy')) {
                return res.status(404).json(result);
            }
            return res.status(result.success ? 200 : 400).json(result);
        } catch (error: any) {
            console.error('Error in updateTrangThai controller:', error);
            return res.status(500).json({ success: false, message: 'Lỗi server khi cập nhật trạng thái chuyến đi', error: error.message });
        }
    }

    /**
     * POST /api/v1/chuyen-di/:id/incident-warning
     * Gửi cảnh báo sự cố cho phụ huynh có con trong chuyến đi
     */
    async sendIncidentWarning(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const incidentData = req.body;

            if (!id) {
                return res.status(400).json({ success: false, message: 'Thiếu ID chuyến đi' });
            }

            const idNumber = parseInt(id);
            if (isNaN(idNumber)) {
                return res.status(400).json({ success: false, message: 'ID chuyến đi không hợp lệ' });
            }

            if (!incidentData.noi_dung || !incidentData.noi_dung.trim()) {
                return res.status(400).json({ success: false, message: 'Thiếu nội dung cảnh báo' });
            }

            // Lấy ID người gửi từ body hoặc từ session/token nếu có middleware auth
            const senderId = incidentData.id_nguoi_gui || req.body.senderId;

            const result = await this.service.sendIncidentWarning(idNumber, incidentData, senderId);

            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json(result);
            }
        } catch (error: any) {
            console.error('Error in sendIncidentWarning controller:', error);
            return res.status(500).json({
                success: false,
                message: 'Lỗi server khi gửi cảnh báo sự cố',
                error: error.message
            });
        }
    }
}

export default new ChuyenDiController();