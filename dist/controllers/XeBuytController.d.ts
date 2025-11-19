import { Request, Response } from "express";
export declare class XeBuytController {
    private service;
    constructor();
    getAllXeBuyt(req: Request, res: Response): Promise<void>;
    getXeBuytById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
declare const _default: XeBuytController;
export default _default;
//# sourceMappingURL=XeBuytController.d.ts.map