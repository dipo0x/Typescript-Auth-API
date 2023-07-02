import { FastifyInstance } from 'fastify';
import UserController from './user.controller';
import middleware from '../../middlewares/auth.middleware';

async function userRoutes(server: FastifyInstance) {
  server.get('/dashboard', {
    preHandler: middleware.authenticateRequest,
    handler:  UserController.userDashboardHandler
    }
  );
}

export default userRoutes;