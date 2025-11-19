import { Request, Response } from 'express';
export declare class ThongBaoController {
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getByIdNguoiDung(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: ThongBaoController;
export default _default;
//# sourceMappingURL=ThongBaoController.d.ts.map