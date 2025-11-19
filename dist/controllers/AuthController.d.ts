import { Request, Response } from 'express';
/**
 * Controller layer cho Authentication
 * Xử lý HTTP requests và responses
 */
export declare class AuthController {
    /**
     * Xử lý đăng ký tài khoản mới
     * POST /api/v1/auth/register
     */
    register(req: Request, res: Response): Promise<Response>;
    /**
     * Xử lý đăng nhập
     * POST /api/v1/auth/login
     */
    login(req: Request, res: Response): Promise<Response>;
    /**
     * Lấy thông tin user hiện tại
     * GET /api/v1/auth/me
     */
    getCurrentUser(req: Request, res: Response): Promise<Response>;
    /**
     * Đăng xuất (optional - nếu dùng JWT)
     * POST /api/v1/auth/logout
     */
    logout(req: Request, res: Response): Promise<Response>;
}
declare const _default: AuthController;
export default _default;
//# sourceMappingURL=AuthController.d.ts.map