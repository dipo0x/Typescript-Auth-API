import { CreateUserInput } from './auth.schema';
import token from '../../utils/token.util';
import { prisma } from '../../config/database'

const service = {
  async createUser(userPayload: CreateUserInput) {
    const { password, ...rest } = userPayload;
    const hash = await token.hashPassword(password);
    const user = await prisma.user.create({
      data: { ...rest },
    });
    await prisma.auth.create({
      data: { userId: user.id, password: hash },
    });
    return user;
  },
  async getAuthByUserId(userId: string) {
    if (!userId) {
      return null;
    }
    const auth = await prisma.auth.findUnique({
      where: { userId: userId },
    });
    return auth;
  },
};

export default service;