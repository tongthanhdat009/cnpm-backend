import { Request, Response } from "express";
export declare class NguoiDungController {
    private service;
    constructor();
    getAllNguoiDung(req: Request, res: Response): Promise<void>;
    getNguoiDungById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getNguoiDungByVaiTro(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: NguoiDungController;
export default _default;
//# sourceMappingURL=NguoiDungController.d.ts.map