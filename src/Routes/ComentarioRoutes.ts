
import { Router } from 'express';
import {
  getAllcomments,
  getcommentsById,
  createcomments,
  updatecomments,
  deletecomments,
} from '../Controllers/ComentarioControllers';

const router = Router();

router.get('/', getAllcomments);
router.get('/:id', getcommentsById);
router.post('/', createcomments);
router.put('/:id', updatecomments);
router.delete('/:id', deletecomments);

export default router;