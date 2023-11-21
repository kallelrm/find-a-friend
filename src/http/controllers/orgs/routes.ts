import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { register } from './register'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/session', authenticate)
  app.post('/create', register)
}
