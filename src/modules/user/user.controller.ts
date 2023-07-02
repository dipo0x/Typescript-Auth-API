import { FastifyReply, FastifyRequest } from 'fastify';

const user = {
  async userDashboardHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
        ///add any other info you want to add here, but preferrably in the login
        /// endpoint so you don't fetch same data twice
        
      return reply.code(200).send({
        status: 200,
        success: true,
        data: {
          user: request.user
        },
      });
    } catch (e) {
      return reply.code(500).send({
        status: 500,
        success: false,
        message: e,
      });
    }
  },
};

export default user;
