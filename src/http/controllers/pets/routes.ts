import { FastifyInstance } from 'fastify'
import { list } from './list'
import { filter } from './filter'
import { detail } from './detail'
import { create } from './create'
import { adopt } from './adopt'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/create', create)
  app.post('/detail', detail)
  app.get('/list/:city', list)
  app.post('/filter', filter)
  app.patch('/adopt/:id', { onRequest: [verifyJWT] }, adopt)
}
