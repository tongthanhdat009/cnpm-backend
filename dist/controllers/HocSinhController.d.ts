import { Request, Response } from 'express';
export declare class HocSinhController {
    getAll(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getByPhuHuynh(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
declare const _default: HocSinhController;
export default _default;
//# sourceMappingURL=HocSinhController.d.ts.map