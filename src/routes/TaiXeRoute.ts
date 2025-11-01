import { Router } from 'express';
import TaiXeController from '../controllers/TaiXeController';

const router = Router();

// (no top-level debug logs)

router.get('/', TaiXeController.getAll.bind(TaiXeController));
router.get('/:id', TaiXeController.getById.bind(TaiXeController));
router.post('/', TaiXeController.create.bind(TaiXeController));
router.put('/:id', TaiXeController.update.bind(TaiXeController));
router.delete('/:id', TaiXeController.delete.bind(TaiXeController));

export default router;
