import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'
import { makeAuthenticateService } from '@/services/factories/make-authenticate-service'

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    const authenticateService = makeAuthenticateService()

    const { org } = await authenticateService.execute({ email, password })

    const token = await res.jwtSign(
      {
        name: org.name,
      },
      {
        sign: {
          sub: org.id,
        },
      },
    )

    const refreshToken = await res.jwtSign(
      {
        name: org.name,
      },
      {
        sign: {
          sub: org.id,
          expiresIn: '7d',
        },
      },
    )

    return res
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return res.status(400).send({ message: error.message })
    }

    throw error
  }
}
