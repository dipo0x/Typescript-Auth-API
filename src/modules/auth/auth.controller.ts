import { FastifyReply, FastifyRequest } from 'fastify';
import ApiError from '../../errors/ApiError';

// import repository from './auth.repository';
// import hash from './../../utils/token.util';
// import token from './../../utils/jwt.util';

const auth = {
  async registerUserHandler(
    request: FastifyRequest<{
      Body: {
        name: string;
        email: string;
        password: string
      }
    }>,
    reply: FastifyReply
  ) {
    try {
      const body = request.body;
      let { name, email, password } = body;
      if (!name?.trim() || !email?.trim() || !password?.trim()) {
        new ApiError(400,  'All fields are required')
      }

      const userExists = await repository.findUserByEmail(body.email);
      if (userExists) {
        return reply.code(400).send({
          status: 400,
          success: false,
          message: 'User already exists',
        });
      }
      const referralCodeExists = await repository.findUserByreferralCode(body.referredBy as string);
      if (!referralCodeExists && body.referredBy) {
        return reply.code(400).send({
          status: 400,
          success: false,
          message: `User with referral code ${body.referredBy} does not exist`,
        });
      }
      const user = await repository.createUser(body);
      return reply.code(201).send({
        status: 201,
        success: true,
        message: user,
      });
    } catch (e) {
      return reply.code(500).send({
        status: 500,
        success: false,
        message: e,
      });
    }
  }
};

export default auth;