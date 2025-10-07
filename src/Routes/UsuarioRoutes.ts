import { Router} from 'express';
import {
    getAllusuarios,
    getusuarioById,
    createusuario,
    updateusuario,
    deleteusuario,
}   from '../Controllers/UsuarioControllers';

    const router = Router();

    router.get('/usuarios', getAllusuarios);
    router.get('/usuarios/:id', getusuarioById);
    router.post('/usuarios', createusuario);
    router.put('/usuarios/:id', updateusuario);
    router.delete('/usuarios/:id', deleteusuario);

    export default router;