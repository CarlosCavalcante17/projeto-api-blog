
import { Router } from 'express';
import {
  getAllcomments,
  getcommentsById,
  createcomments,
  updatecomments,
  deletecomments,
  getcommentsByPost,
} from '../Controllers/ComentarioControllers';

const router = Router();


router.get('/', getAllcomments);
router.get('/post/:postId', getcommentsByPost);
router.get('/:id', getcommentsById);
router.post('/', createcomments);
router.put('/:id', updatecomments);
router.delete('/:id', deletecomments);

export default router;