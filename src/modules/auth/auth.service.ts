import { prisma } from '../../config/database'

const service = {
    async findUserByEmail(email: string) {
        if (!email) {
            return null;
        }
        const auth = await prisma.user.findUnique({
            where: { email: email },
        });
        return auth;
    }
}

export default service;