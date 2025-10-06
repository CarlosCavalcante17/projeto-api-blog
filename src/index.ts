import Express from "express";
import 'dotenv/config';
import { setupSwagger } from './swagger';

const app = Express();
app.use(Express.json());
setupSwagger(app);
app.use('', );

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`O servidor está rodando no http://localhost:${PORT}`);
});


