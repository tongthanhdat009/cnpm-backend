import { Request, Response } from "express";
import { BusTrackingService } from "../services/BusTrackingService";

export class BusTrackingController {
    private service: BusTrackingService;
    
    constructor() {
        this.service = new BusTrackingService();
    }

    /**
     * POST /api/v1/bus-tracking/update-location
     * Cập nhật vị trí xe buýt
     */
    async updateBusLocation(req: Request, res: Response) {
        try {
            const { id_xe_buyt, vi_do, kinh_do } = req.body;

            if (!id_xe_buyt || vi_do === undefined || kinh_do === undefined) {
                return res.status(400).json({
                    success: false,
                    message: "Thiếu thông tin bắt buộc (id_xe_buyt, vi_do, kinh_do)"
                });
            }

            const idXeBuyt = parseInt(id_xe_buyt);
            const viDo = parseFloat(vi_do);
            const kinhDo = parseFloat(kinh_do);

            if (isNaN(idXeBuyt) || isNaN(viDo) || isNaN(kinhDo)) {
                return res.status(400).json({
                    success: false,
                    message: "Dữ liệu không hợp lệ"
                });
            }

            const result = await this.service.updateBusLocation(idXeBuyt, viDo, kinhDo);

            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(400).json(result);
            }
        } catch (error: any) {
            console.error("Error in updateBusLocation controller:", error);
            return res.status(500).json({
                success: false,
                message: "Lỗi server khi cập nhật vị trí xe",
                error: error.message
            });
        }
    }

    /**
     * GET /api/v1/bus-tracking/bus/:id
     * Lấy vị trí hiện tại của xe buýt
     */
    async getBusLocation(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "Thiếu ID xe buýt"
                });
            }

            const idXeBuyt = parseInt(id);

            if (isNaN(idXeBuyt)) {
                return res.status(400).json({
                    success: false,
                    message: "ID xe buýt không hợp lệ"
                });
            }

            const result = await this.service.getBusLocation(idXeBuyt);

            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json(result);
            }
        } catch (error: any) {
            console.error("Error in getBusLocation controller:", error);
            return res.status(500).json({
                success: false,
                message: "Lỗi server khi lấy vị trí xe",
                error: error.message
            });
        }
    }

    /**
     * GET /api/v1/bus-tracking/trip/:id
     * Lấy vị trí xe của chuyến đi
     */
    async getActiveTripBusLocation(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "Thiếu ID chuyến đi"
                });
            }

            const idChuyenDi = parseInt(id);

            if (isNaN(idChuyenDi)) {
                return res.status(400).json({
                    success: false,
                    message: "ID chuyến đi không hợp lệ"
                });
            }

            const result = await this.service.getActiveTripBusLocation(idChuyenDi);

            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json(result);
            }
        } catch (error: any) {
            console.error("Error in getActiveTripBusLocation controller:", error);
            return res.status(500).json({
                success: false,
                message: "Lỗi server khi lấy vị trí xe của chuyến đi",
                error: error.message
            });
        }
    }

    /**
     * GET /api/v1/bus-tracking/student/:id/active-trips
     * Lấy danh sách chuyến đi đang hoạt động của học sinh (cho phụ huynh)
     */
    async getActiveTripsForStudent(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: "Thiếu ID học sinh"
                });
            }

            const idHocSinh = parseInt(id);

            if (isNaN(idHocSinh)) {
                return res.status(400).json({
                    success: false,
                    message: "ID học sinh không hợp lệ"
                });
            }

            const result = await this.service.getActiveTripsForStudent(idHocSinh);

            if (result.success) {
                return res.status(200).json(result);
            } else {
                return res.status(400).json(result);
            }
        } catch (error: any) {
            console.error("Error in getActiveTripsForStudent controller:", error);
            return res.status(500).json({
                success: false,
                message: "Lỗi server khi lấy danh sách chuyến đi của học sinh",
                error: error.message
            });
        }
    }
}

export default new BusTrackingController();
