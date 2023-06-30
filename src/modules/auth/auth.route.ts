import { FastifyInstance } from 'fastify';
import AuthController from './auth.controller';
// import { $ref } from './auth.schema';

async function userRoutes(server: FastifyInstance) {
  server.post('/register/', AuthController.registerUserHandler);
  server.post('/login', AuthController.loginUserHandler);
}

export default userRoutes;
