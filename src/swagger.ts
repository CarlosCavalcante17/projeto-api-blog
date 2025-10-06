import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
    definition: {
        openapi: '2.0.0',  
        info: {
            title: 'Api de Blog',
            version: '1.0.0',
            description: 'API para gerenciar usuarios, postagens e comentarios',
        },
        servers: [
           {
            url: 'http://localhost:3000',
           },
        ],
    },
    apis: ['./src/routes/*ts'],

};

    const specs = swaggerJsdoc(options);

    export const setupSwagger = (app: Express) => {
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    }
