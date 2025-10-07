
import { Router } from 'express';
import {
  getAllcomentarios,
  getComentarioById,
  createcomentario,
  updatecomentario,
  deletecomentario,
} from '../Controllers/ComentarioControllers';

const router = Router();

router.get('/', getAllcomentarios);
router.get('/:id', getComentarioById);
router.post('/', createcomentario);
router.put('/:id', updatecomentario);
router.delete('/:id', deletecomentario);

export default router;