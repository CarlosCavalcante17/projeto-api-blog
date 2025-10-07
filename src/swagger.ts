// --- Arquivo: src/swagger.ts ---

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Blog API',
            version: '1.0.0',
            description: 'API documentada com Swagger para um blog simples, permitindo operações CRUD em usuários, postagens e comentários.',
            contact: {
                name: 'Carlos Cavalcante',
                url: 'https://github.com/CarlosCavalcante17/projeto-api-blog',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de Desenvolvimento',
            },
        ],
        components: {
            schemas: {
                Usuario: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', description: 'ID do usuário', example: 1 },
                        nome: { type: 'string', description: 'Nome do usuário', example: 'João Silva' },
                        email: { type: 'string', format: 'email', description: 'Email do usuário', example: 'joao@example.com' },
                    },
                },
                Postagem: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', description: 'ID da postagem' },
                        title: { type: 'string', description: 'Título da postagem' },
                        content: { type: 'string', description: 'Conteúdo da postagem' },
                        published: { type: 'boolean', description: 'Indica se a postagem está publicada' },
                        autorId: { type: 'integer', description: 'ID do autor da postagem' },
                        createdAt: { type: 'string', format: 'date-time', description: 'Data de criação' },
                    },
                },
                Comentario: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', description: 'ID do comentário' },
                        text: { type: 'string', description: 'Texto do comentário' },
                        autorId: { type: 'integer', description: 'ID do autor do comentário' },
                        postagemId: { type: 'integer', description: 'ID da postagem comentada' },
                        createdAt: { type: 'string', format: 'date-time', description: 'Data de criação' },
                    },
                },
                Error: {
                    type: 'object',
                    properties: {
                        error: { type: 'string', description: 'Mensagem de erro' },
                    },
                },
            },
        },
        paths: {
            // Endpoints de Usuários
            '/users': {
                post: {
                    tags: ['Usuarios'],
                    summary: 'Cria um novo usuário',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        nome: { type: 'string', example: 'Maria Santos' },
                                        email: { type: 'string', format: 'email', example: 'maria@example.com' },
                                    },
                                    required: ['nome', 'email'],
                                },
                            },
                        },
                    },
                    responses: {
                        '201': { description: 'Usuário criado com sucesso', content: { 'application/json': { schema: { $ref: '#/components/schemas/Usuario' } } } },
                        '400': { description: 'Dados inválidos', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
                        '409': { description: 'Email já em uso', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
                    },
                },
                get: {
                    tags: ['Usuarios'],
                    summary: 'Lista todos os usuários',
                    responses: {
                        '200': { description: 'Lista de usuários', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Usuario' } } } } },
                    },
                },
            },
            '/users/{id}': {
                get: {
                    tags: ['Usuarios'],
                    summary: 'Busca um usuário por ID',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: {
                        '200': { description: 'Usuário encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Usuario' } } } },
                        '404': { description: 'Usuário não encontrado' },
                    },
                },
                put: {
                    tags: ['Usuarios'],
                    summary: 'Atualiza um usuário existente',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        nome: { type: 'string' },
                                        email: { type: 'string', format: 'email' },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        '200': { description: 'Usuário atualizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Usuario' } } } },
                        '404': { description: 'Usuário não encontrado' },
                    },
                },
                delete: {
                    tags: ['Usuarios'],
                    summary: 'Deleta um usuário',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: {
                        '204': { description: 'Usuário deletado com sucesso' },
                        '404': { description: 'Usuário não encontrado' },
                    },
                },
            },
            // Endpoints de Postagens
            '/posts': {
                post: {
                    tags: ['Postagens'],
                    summary: 'Cria uma nova postagem',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        title: { type: 'string', example: 'Aprendendo Node.js' },
                                        content: { type: 'string', example: 'Este é um post sobre...' },
                                        autorId: { type: 'integer', example: 1 },
                                    },
                                    required: ['title', 'autorId'],
                                },
                            },
                        },
                    },
                    responses: {
                        '201': { description: 'Postagem criada com sucesso', content: { 'application/json': { schema: { $ref: '#/components/schemas/Postagem' } } } },
                        '404': { description: 'Autor não encontrado' },
                    },
                },
                get: {
                    tags: ['Postagens'],
                    summary: 'Lista todas as postagens',
                    responses: {
                        '200': { description: 'Lista de postagens' },
                    },
                },
            },
            '/posts/{id}': {
                get: {
                    tags: ['Postagens'],
                    summary: 'Busca uma postagem por ID',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: {
                        '200': { description: 'Postagem encontrada' },
                        '404': { description: 'Postagem não encontrada' },
                    },
                },
                put: {
                    tags: ['Postagens'],
                    summary: 'Atualiza uma postagem existente',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        title: { type: 'string' },
                                        content: { type: 'string' },
                                        published: { type: 'boolean' },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        '200': { description: 'Postagem atualizada' },
                        '404': { description: 'Postagem não encontrada' },
                    },
                },
                delete: {
                    tags: ['Postagens'],
                    summary: 'Deleta uma postagem',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: {
                        '204': { description: 'Postagem deletada com sucesso' },
                        '404': { description: 'Postagem não encontrada' },
                    },
                },
            },
            // Endpoints de Comentários
            '/comments': {
                post: {
                    tags: ['Comentarios'],
                    summary: 'Cria um novo comentário',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        text: { type: 'string', example: 'Ótimo post!' },
                                        autorId: { type: 'integer', example: 1 },
                                        postagemId: { type: 'integer', example: 1 },
                                    },
                                    required: ['text', 'autorId', 'postagemId'],
                                },
                            },
                        },
                    },
                    responses: {
                        '201': { description: 'Comentário criado com sucesso', content: { 'application/json': { schema: { $ref: '#/components/schemas/Comentario' } } } },
                        '404': { description: 'Autor ou Postagem não encontrado(a)' },
                    },
                },
                get: {
                    tags: ['Comentarios'],
                    summary: 'Lista todos os comentários',
                    responses: {
                        '200': { description: 'Lista de comentários' },
                    },
                },
            },
            '/comments/{id}': {
                get: {
                    tags: ['Comentarios'],
                    summary: 'Busca um comentário por ID',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: {
                        '200': { description: 'Comentário encontrado' },
                        '404': { description: 'Comentário não encontrado' },
                    },
                },
                put: {
                    tags: ['Comentarios'],
                    summary: 'Atualiza um comentário existente',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        text: { type: 'string' },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        '200': { description: 'Comentário atualizado' },
                        '404': { description: 'Comentário não encontrado' },
                    },
                },
                delete: {
                    tags: ['Comentarios'],
                    summary: 'Deleta um comentário',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: {
                        '204': { description: 'Comentário deletado com sucesso' },
                        '404': { description: 'Comentário não encontrado' },
                    },
                },
            },
        },
    },
    apis: [], // Não precisamos de 'apis' se definimos tudo em 'paths'
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));    
};