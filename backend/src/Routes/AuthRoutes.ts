import { Router } from 'express';
import { login } from '../Controllers/AuthControllers';

const router = Router();

router.post('/login', login);

export default router;
