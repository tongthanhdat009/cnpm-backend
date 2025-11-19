import e, { Request, Response } from "express";
export declare class TuyenDuongController {
    getAll(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<void>;
    getTuyenDuongById(req: Request, res: Response): Promise<e.Response<any, Record<string, any>> | undefined>;
    getThoiLuongDuKien(req: Request, res: Response): Promise<e.Response<any, Record<string, any>> | undefined>;
    update(req: Request, res: Response): Promise<e.Response<any, Record<string, any>>>;
    delete(req: Request, res: Response): Promise<e.Response<any, Record<string, any>>>;
    assignStudent(req: Request, res: Response): Promise<e.Response<any, Record<string, any>>>;
    unassignStudent(req: Request, res: Response): Promise<e.Response<any, Record<string, any>>>;
}
declare const _default: TuyenDuongController;
export default _default;
//# sourceMappingURL=TuyenDuongController.d.ts.map