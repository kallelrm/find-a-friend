import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeDetailPetService } from '@/services/factories/make-detail-pet-service'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found'

export async function detail(req: FastifyRequest, res: FastifyReply) {
  const detailPetBodySchema = z.object({
    id: z.string(),
  })

  const { id } = detailPetBodySchema.parse(req.body)

  try {
    const detailPetService = makeDetailPetService()
    const pet = await detailPetService.execute({ id })
    return res.send({ pet })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).send({
        message: error.message,
      })
    }
    throw error
  }
}
