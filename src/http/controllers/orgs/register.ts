import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeRegisterService } from '@/services/factories/make-register-service'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists'

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    phone: z.string(),
    address: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { address, email, name, phone, password } = registerBodySchema.parse(
    req.body,
  )

  try {
    const registerService = makeRegisterService()
    await registerService.execute({ address, email, name, password, phone })
  } catch (error) {
    console.log(error)
    if (error instanceof UserAlreadyExistsError) {
      return res.status(409).send({
        message: error.message,
      })
    }
    throw error
  }
}
