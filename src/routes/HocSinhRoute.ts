import { Router } from 'express';
import HocSinhController from '../controllers/HocSinhController';

const router = Router();

router.get('/', HocSinhController.getAll.bind(HocSinhController));
router.get('/phu-huynh/:idPhuHuynh', HocSinhController.getByPhuHuynh.bind(HocSinhController));
router.get('/:id', HocSinhController.getById.bind(HocSinhController));
router.post('/', HocSinhController.create.bind(HocSinhController));
router.put('/:id', HocSinhController.update.bind(HocSinhController));
router.delete('/:id', HocSinhController.delete.bind(HocSinhController));

export default router;
