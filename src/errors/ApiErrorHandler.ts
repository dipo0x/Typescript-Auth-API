import { FastifyReply } from 'fastify';

function apiErrorHandler(code: number, message: string, reply: FastifyReply) {
  try{
    reply.code(code).send({ 
      status: code, 
      success: false, 
      message: message 
    })
  } 
  catch(err){
    console.log(err);
    reply.status(500).send({ 
      status: 500, 
      success: false,
      message: 'Something went wrong' 
    });
  }
}
export default apiErrorHandler;