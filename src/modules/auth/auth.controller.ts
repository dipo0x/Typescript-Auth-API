import { FastifyReply, FastifyRequest } from 'fastify';
import ApiError from '../../errors/ApiErrorHandler';
import service from './auth.service';
import redisService from '../../services/redis.service';
import repository from './auth.repository';
import token from '../../utils/token.util';

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
    } catch (err) {
      console.log(err)
      ApiError(500, 'Something went wrong', reply);
    }
  },
  async loginUserHandler(
    request: FastifyRequest<{
      Body: {
        email: string;
        password: string;
      };
    }>,
    reply: FastifyReply
  ) {
    try {
      const body = request.body;
      let { email, password } = body;
      if (!email?.trim() || !password?.trim()) {
        return ApiError(400, 'All fields are required', reply);
      }
      const auth = await repository.findAuthByEmail(email)
      if(!auth){
        return ApiError(404, 'Invalid credentials', reply);
      }
      const isLocked = await redisService.getValue(auth.id)
      if(isLocked == 1){
        return ApiError(409, 'Your account is temporarily locked. Please contact support', reply);
      }
      const isCorrectPassword = await token.comparePasswords(password, auth.password)
      if(!isCorrectPassword){
        const data = await redisService.createTempLock(auth.id)
        ApiError(400, `Incorrect password. You have ${data} chance(s) left.`, reply);
      }
      const access_token = await token.signToken(auth);
      const user = await repository.findUserByEmail(email)
      return reply.code(200).send({
        status: 200,
        success: true,
        message: {
          user,
          access_token,
        },
      });
    }
    catch (err) {
      console.log(err)
      ApiError(500, 'Something went wrong', reply);
    }
  }
};

export default auth;