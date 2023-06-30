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
  async findUserByEmail(email: string) {
    if (!email) {
      return null;
    }
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    return user;
  },

  async findAuthByEmail(email: string) {
    if (!email) {
      return null;
    }
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if(!user){
      return null
    }
    const auth = await prisma.auth.findUnique({
      where: { userId: user.id }
    })
    return auth;
  },
};

export default service;