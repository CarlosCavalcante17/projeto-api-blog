
import { Router } from 'express';
import {
  getAllcomentarios,
  getcomentarioById,
  createcomentario,
  updatecomentario,
  deletecomentario,
} from '../Controllers/ComentarioControllers';

const router = Router();

router.get('/', getAllcomentarios);
router.get('/:id', getcomentarioById);
router.post('/', createcomentario);
router.put('/:id', updatecomentario);
router.delete('/:id', deletecomentario);

export default router;