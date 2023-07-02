import { FastifyInstance } from 'fastify';
import AuthController from './auth.controller';

async function authRoutes(server: FastifyInstance) {
  server.post('/register/', AuthController.registerUserHandler);
  server.post('/login', AuthController.loginUserHandler);
}

export default authRoutes;
