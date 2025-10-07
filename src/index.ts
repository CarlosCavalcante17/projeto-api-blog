import express from "express";
import 'dotenv/config';
import { setupSwagger } from './swagger';
import UsuarioRoutes from './Routes/UsuarioRoutes'
import PostRoutes from './Routes/PostRoutes'
import ComentarioRoutes from './Routes/ComentarioRoutes'

const app = express();
app.use(express.json());
setupSwagger(app);
app.use('/Usuarios', UsuarioRoutes );
app.use('/Post', PostRoutes);
app.use('/Comentario', ComentarioRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`O servidor está rodando no http://localhost:${PORT}`);
    console.log(`Swagger docs disponíveis em http://localhost:${PORT}/api-docs`);

});


