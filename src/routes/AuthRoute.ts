import { Router } from 'express';
import authController from '../controllers/AuthController';

const router = Router();

/**
 * Authentication Routes
 * Base path: /api/v1/auth
 */

// POST /api/v1/auth/register - Đăng ký tài khoản mới
router.post('/register', authController.register.bind(authController));

// POST /api/v1/auth/login - Đăng nhập
router.post('/login', authController.login.bind(authController));

// GET /api/v1/auth/me - Lấy thông tin user hiện tại (cần authentication middleware)
// router.get('/me', authMiddleware, authController.getCurrentUser.bind(authController));

// POST /api/v1/auth/logout - Đăng xuất
router.post('/logout', authController.logout.bind(authController));

export default router;
