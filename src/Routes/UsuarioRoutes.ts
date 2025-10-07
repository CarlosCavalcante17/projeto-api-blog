import { Router} from 'express';
import {
    getAllusuarios,
    getusuarioById,
    createUser,
    updateusuario,
    deleteusuario,
}   from '../Controllers/UsuarioControllers';

    const router = Router();

    router.get('/', getAllusuarios);
    router.get('/:id', getusuarioById);
    router.post('/', createUser);
    router.put('/:id', updateusuario);
    router.delete('/:id', deleteusuario);

    export default router;