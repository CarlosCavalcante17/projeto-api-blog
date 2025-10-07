import { Router} from 'express';
import {
    getAllusers,
    getusersById,
    createUser,
    updateusers,
    deleteUser,
}   from '../Controllers/UsuarioControllers';

    const router = Router();

    router.get('/', getAllusers);
    router.get('/:id', getusersById);
    router.post('/', createUser);
    router.put('/:id', updateusers);
    router.delete('/:id', deleteUser);

    export default router;