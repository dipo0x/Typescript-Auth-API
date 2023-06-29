import ApiError from './ApiError';
import { FastifyReply, FastifyRequest } from 'fastify';

function apiErrorHandler(err: any, req: FastifyRequest, res: FastifyReply, next: () => void): void {
  if (err instanceof ApiError) {
    res.status(err.code).send({ status: err.code, success: false, message: err.message })
    return;
  }
  console.log(err);
  res.status(500).send({ status: 500, success: false, message: 'Something went wrong' });
}
export default apiErrorHandler