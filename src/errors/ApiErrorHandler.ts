import { FastifyReply } from 'fastify';

function apiErrorHandler(code: number, message: string, reply: FastifyReply) {
  try{
    return reply.code(code).send({ 
      status: code, 
      success: false, 
      message: message 
    })
  } 
  catch(err){
    console.log(err);
    return reply.status(500).send({ 
      status: 500, 
      success: false,
      message: 'Something went wrong' 
    });
  }
}
export default apiErrorHandler;