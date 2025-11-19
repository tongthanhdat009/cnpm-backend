"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const router = (0, express_1.Router)();
/**
 * Authentication Routes
 * Base path: /api/v1/auth
 */
// POST /api/v1/auth/register - Đăng ký tài khoản mới
router.post('/register', AuthController_1.default.register.bind(AuthController_1.default));
// POST /api/v1/auth/login - Đăng nhập
router.post('/login', AuthController_1.default.login.bind(AuthController_1.default));
// GET /api/v1/auth/me - Lấy thông tin user hiện tại (cần authentication middleware)
// router.get('/me', authMiddleware, authController.getCurrentUser.bind(authController));
// POST /api/v1/auth/logout - Đăng xuất
router.post('/logout', AuthController_1.default.logout.bind(AuthController_1.default));
exports.default = router;
//# sourceMappingURL=AuthRoute.js.map