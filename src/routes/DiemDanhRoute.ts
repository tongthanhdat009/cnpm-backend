import { Router } from 'express';
import DiemDanhController from '../controllers/DiemDanhController';

const router = Router();

// Cập nhật trạng thái điểm danh: PATCH /api/v1/diem-danh/:id { trang_thai }
router.patch('/:id', DiemDanhController.updateTrangThai.bind(DiemDanhController));

export default router;
