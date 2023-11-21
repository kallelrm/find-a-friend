import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeListPetService } from '@/services/factories/make-list-pet-service'

export async function list(req: FastifyRequest, res: FastifyReply) {
  const listPetsParamsSchema = z.object({
    city: z.string(),
  })

  const { city } = listPetsParamsSchema.parse(req.params)

  const listPetsService = makeListPetService()
  const pets = await listPetsService.execute({ city })

  return res.send({ pets })
}
