import { Request, Response } from "express";
export declare class ChuyenDiController {
    private service;
    constructor();
    /**
     * GET /api/v1/chuyen-di
     * Lấy tất cả chuyến đi hoặc lọc theo query params
     * Query: tai_xe, tuyen_duong, ngay, trang_thai
     */
    getAllChuyenDi(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * GET /api/v1/chuyen-di/:id
     * Lấy chi tiết chuyến đi theo ID
     */
    getChuyenDiById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * GET /api/v1/chuyen-di/hoc-sinh/:idHocSinh
     * Lấy danh sách chuyến đi của một học sinh
     */
    getChuyenDiByHocSinh(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    createRecurringChuyenDi(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * PUT /api/v1/chuyen-di/:id
     * Cập nhật chuyến đi
     */
    updateChuyenDi(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteChuyenDi(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * PATCH /api/v1/chuyen-di/:id/trang-thai
     * Cập nhật trạng thái chuyến đi; nếu chuyển sang 'hoan_thanh' -> auto đổi điểm danh 'da_don' => 'da_tra'
     */
    updateTrangThai(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    /**
     * POST /api/v1/chuyen-di/:id/incident-warning
     * Gửi cảnh báo sự cố cho phụ huynh có con trong chuyến đi
     */
    sendIncidentWarning(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: ChuyenDiController;
export default _default;
//# sourceMappingURL=ChuyenDiController.d.ts.map