import { Request, Response } from "express";
export declare class BusTrackingController {
    private service;
    constructor();
    /**
     * POST /api/v1/bus-tracking/update-location
     * Cập nhật vị trí xe buýt
     */
    updateBusLocation(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * GET /api/v1/bus-tracking/bus/:id
     * Lấy vị trí hiện tại của xe buýt
     */
    getBusLocation(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * GET /api/v1/bus-tracking/trip/:id
     * Lấy vị trí xe của chuyến đi
     */
    getActiveTripBusLocation(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * GET /api/v1/bus-tracking/student/:id/active-trips
     * Lấy danh sách chuyến đi đang hoạt động của học sinh (cho phụ huynh)
     */
    getActiveTripsForStudent(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: BusTrackingController;
export default _default;
//# sourceMappingURL=BusTrackingController.d.ts.map