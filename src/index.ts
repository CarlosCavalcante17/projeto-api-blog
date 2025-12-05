import express from "express";
import cors from 'cors';
import 'dotenv/config';
import { setupSwagger } from './swagger';
import UsuarioRoutes from './Routes/UsuarioRoutes'
import PostRoutes from './Routes/PostRoutes'
import ComentarioRoutes from './Routes/ComentarioRoutes'
import AuthRoutes from './Routes/AuthRoutes'

const app = express();

app.use(cors({
    origin: '*'
}));

// Aumenta o limite de payload para aceitar imagens
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
setupSwagger(app);
app.use('/users', UsuarioRoutes );
app.use('/posts', PostRoutes);
app.use('/comments', ComentarioRoutes);
app.use('/', AuthRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`O servidor está rodando no http://localhost:${PORT}`);
    console.log(`Swagger docs disponíveis em http://localhost:${PORT}/api-docs`);

});


