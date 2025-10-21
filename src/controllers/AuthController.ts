import { Request, Response } from 'express';
import authService from '../services/AuthService';

/**
 * Controller layer cho Authentication
 * Xử lý HTTP requests và responses
 */

export class AuthController {
  /**
   * Xử lý đăng ký tài khoản mới
   * POST /api/v1/auth/register
   */
  async register(req: Request, res: Response): Promise<Response> {
    try {
      const userData = req.body;
      const newUser = await authService.register(userData);

      return res.status(201).json({
        success: true,
        message: 'Tạo tài khoản thành công',
        data: newUser,
      });
    } catch (error: any) {
      console.error('Register error:', error);

      // Xử lý các loại lỗi cụ thể
      if (
        error.message.includes('Vui lòng nhập đầy đủ') ||
        error.message.includes('Vai trò không hợp lệ') ||
        error.message.includes('Mật khẩu phải có') ||
        error.message.includes('Tên tài khoản phải') ||
        error.message.includes('Số điện thoại không hợp lệ')
      ) {
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
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const credentials = req.body;
      const userData = await authService.login(credentials);

      return res.status(200).json({
        success: true,
        message: 'Đăng nhập thành công',
        data: userData,
      });
    } catch (error: any) {
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
  async getCurrentUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId = (req as any).userId; // Từ middleware authentication
      
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'Chưa đăng nhập',
        });
      }

      const user = await authService.getUserById(userId);
      
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
    } catch (error: any) {
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
  async logout(req: Request, res: Response): Promise<Response> {
    // Nếu dùng JWT, client sẽ xóa token
    // Nếu dùng session, xóa session ở đây
    
    return res.status(200).json({
      success: true,
      message: 'Đăng xuất thành công',
    });
  }
}

export default new AuthController();
