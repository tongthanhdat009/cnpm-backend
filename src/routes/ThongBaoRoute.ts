// backend/src/routes/ThongBaoRoute.ts
import { Router } from 'express';
import thongBaoController from '../controllers/ThongBaoController';
// Import middleware xác thực nếu có
// import authMiddleware from '../middleware/authMiddleware';

const router = Router();

// POST /api/v1/thong-bao - Tạo thông báo mới (cần xác thực người gửi)
router.post('/', thongBaoController.create);

// GET /api/v1/thong-bao - Lấy danh sách thông báo (có thể cần xác thực để lọc theo người nhận)
router.get('/', thongBaoController.getAll);

// GET /api/v1/thong-bao/nguoi-nhan/:id_nguoi_nhan - Lấy thông báo theo ID người nhận
router.get('/nguoi-nhan/:id_nguoi_nhan', thongBaoController.getByIdNguoiDung);
// Các route khác: PUT /:id/read, DELETE /:id, ...

export default router;