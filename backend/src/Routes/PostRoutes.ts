import { Router } from 'express';
import {
  getAllposts,
  getpostById,
  createpost,
  updatepost,
  deletepost,
} from '../Controllers/PostControllers';

const router = Router();

router.get('/', getAllposts);
router.get('/:id', getpostById);
router.post('/', createpost);
router.put('/:id', updatepost);
router.delete('/:id', deletepost);

export default router;