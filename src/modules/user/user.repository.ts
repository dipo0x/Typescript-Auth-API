import { prisma } from '../../config/database'

const repository = {
  async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
      return null;
    } else {
      return user;
    }
  }
};

export default repository;