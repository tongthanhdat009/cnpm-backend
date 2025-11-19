import { Router } from 'express';
import DiemDungController from '../controllers/DiemDungController';

const router = Router();

router.get('/', DiemDungController.getAll.bind(DiemDungController));
router.get('/unassigned-counts', DiemDungController.getUnassignedCounts.bind(DiemDungController));
router.get('/:id', DiemDungController.getById.bind(DiemDungController));
router.post('/', DiemDungController.create.bind(DiemDungController));
router.put('/:id', DiemDungController.update.bind(DiemDungController));
router.delete('/:id', DiemDungController.delete.bind(DiemDungController));

export default router;
