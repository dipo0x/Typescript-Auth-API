import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import authUserRepository from '../modules/auth/auth.repository';
import userRepository from '../modules/user/user.repository';
import ApiError from '../errors/ApiErrorHandler';

interface User {
    id: string,
    email: string;
    name: string;
    isActive: boolean;
  }

declare module 'fastify' {
    interface FastifyRequest {
      user: User
    }
}
  

const authMiddleware = {
  async authenticateRequest(request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
    try {
      const token: string | undefined | string[] = request.headers.authorization || request.headers.Authorization;
      if (!token) {
        return reply.code(400).send({
          status: 400,
          success: false,
          message: 'No Authorization was provided',
        });
      }

      const decoded: JwtPayload = jwt.verify(token as any, `${process.env.AccessTokenKey}`) as JwtPayload;
      const authUserId = await authUserRepository.findAuthById(decoded.id);
      if (!authUserId) {
        return ApiError(400, 'Login to proceed', reply)
      }
      const user = await userRepository.getUserById(authUserId.userId);
      request.user = user 
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return ApiError(400, 'Session expired, please login again', reply)
      }
      if (error instanceof jwt.JsonWebTokenError) {
        return ApiError(400, 'Invalid token, please login again', reply)
      }
      return ApiError(400, 'Login to proceed', reply)
    }
  },
};

export default authMiddleware;
