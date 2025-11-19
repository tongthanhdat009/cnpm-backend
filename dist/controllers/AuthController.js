"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_1 = __importDefault(require("../services/AuthService"));
/**
 * Controller layer cho Authentication
 * Xử lý HTTP requests và responses
 */
class AuthController {
    /**
     * Xử lý đăng ký tài khoản mới
     * POST /api/v1/auth/register
     */
    async register(req, res) {
        try {
            const userData = req.body;
            const newUser = await AuthService_1.default.register(userData);
            return res.status(201).json({
                success: true,
                message: 'Tạo tài khoản thành công',
                data: newUser,
            });
        }
        catch (error) {
            console.error('Register error:', error);
            // Xử lý các loại lỗi cụ thể
            if (error.message.includes('Vui lòng nhập đầy đủ') ||
                error.message.includes('Vai trò không hợp lệ') ||
                error.message.includes('Mật khẩu phải có') ||
                error.message.includes('Tên tài khoản phải') ||
                error.message.includes('Số điện thoại không hợp lệ')) {
                return res.status(400).json({
                    success: false,
                    message: error.message,
                });
            }
            if (error.message.includes('đã tồn tại') || error.message.includes('đã được sử dụng')) {
                return res.status(409).json({
                    success: false,
                    message: error.message,
                });
            }
            return res.status(500).json({
                success: false,
                message: 'Lỗi server, vui lòng thử lại sau',
            });
        }
    }
    /**
     * Xử lý đăng nhập
     * POST /api/v1/auth/login
     */
    async login(req, res) {
        try {
            const credentials = req.body;
            const userData = await AuthService_1.default.login(credentials);
            return res.status(200).json({
                success: true,
                message: 'Đăng nhập thành công',
                data: userData,
            });
        }
        catch (error) {
            console.error('Login error:', error);
            // Xử lý các loại lỗi cụ thể
            if (error.message.includes('Vui lòng nhập đầy đủ')) {
                return res.status(400).json({
                    success: false,
                    message: error.message,
                });
            }
            if (error.message.includes('không đúng')) {
                return res.status(401).json({
                    success: false,
                    message: error.message,
                });
            }
            return res.status(500).json({
                success: false,
                message: 'Lỗi server, vui lòng thử lại sau',
            });
        }
    }
    /**
     * Lấy thông tin user hiện tại
     * GET /api/v1/auth/me
     */
    async getCurrentUser(req, res) {
        try {
            const userId = req.userId; // Từ middleware authentication
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: 'Chưa đăng nhập',
                });
            }
            const user = await AuthService_1.default.getUserById(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Người dùng không tồn tại',
                });
            }
            return res.status(200).json({
                success: true,
                data: user,
            });
        }
        catch (error) {
            console.error('Get current user error:', error);
            return res.status(500).json({
                success: false,
                message: 'Lỗi server, vui lòng thử lại sau',
            });
        }
    }
    /**
     * Đăng xuất (optional - nếu dùng JWT)
     * POST /api/v1/auth/logout
     */
    async logout(req, res) {
        // Nếu dùng JWT, client sẽ xóa token
        // Nếu dùng session, xóa session ở đây
        return res.status(200).json({
            success: true,
            message: 'Đăng xuất thành công',
        });
    }
}
exports.AuthController = AuthController;
exports.default = new AuthController();
//# sourceMappingURL=AuthController.js.map