import { FastifyReply, FastifyRequest } from 'fastify';
import ApiError from '../../errors/ApiErrorHandler';
import service from './auth.service';
import repository from './auth.repository';

const auth = {
  async registerUserHandler(
    request: FastifyRequest<{
      Body: {
        name: string;
        email: string;
        password: string;
      };
    }>,
    reply: FastifyReply
  ) {
    try {
      const body = request.body;
      let { name, email, password } = body;
      if (!name?.trim() || !email?.trim() || !password?.trim()) {
        ApiError(400, 'All fields are required', reply);
      }
      const userExists = await service.findUserByEmail(body.email);
      if (userExists) {
        ApiError(400, 'User already exists', reply);
      }
      const user = await repository.createUser(body);
      return reply.code(201).send({
        status: 201,
        success: true,
        message: user,
      });
    } catch (e) {
      console.log(e)
      return reply.code(500).send({
        status: 500,
        success: false,
        message: "Something went wrong",
      });
    }
  },
};

export default auth;