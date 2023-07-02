import helmet from '@fastify/helmet';
import fastify from 'fastify';
import dotenv from 'dotenv';
import cors from '@fastify/cors';
import { connectToDatabase } from './config/database';
import AuthRoutes from './modules/auth/auth.route';
import UserRoutes from './modules/user/user.route';
import logger from './log/logger';

const uuidv4 = require('uuid').v4;
dotenv.config();

export const port = Number(process.env.PORT) || 3000;

export const server = fastify({
  logger: false,
  genReqId(req) {
    return uuidv4();
  },
});

server.get('/healthcheck', async function () {
  return { status: 'Ok' };
});

server.register(helmet, {
  contentSecurityPolicy: false,
  xDownloadOptions: false,
});

server.decorateReply('removePoweredByHeader', function () {
  this.header('x-powered-by', '');
});

server.register(cors, {});

async function main() {
  server.addHook('preHandler', (request, reply, done) => {
    logger.info(`Request received: ${request.method} ${request.url}`);
    done();
  });

  server.setErrorHandler(async (err, request, reply) => {
    return reply.code(500).send({
      status: 500,
      success: false,
      message: 'Something went wrong',
    });
  }),
  server.setNotFoundHandler(async (request, reply) => {
    return reply.code(404).send({
      status: 404,
      success: false,
      message: 'Page does not exist',
    });
  });
  server.register(UserRoutes, { prefix: 'api/user/' });
  server.register(AuthRoutes, { prefix: 'api/auth/' });

  try {
    await connectToDatabase();
    await server.listen({ port: port });
    console.log('Server ready on port', port);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

main();
