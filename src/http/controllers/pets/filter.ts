import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFilterPetService } from '@/services/factories/make-filter-pet-service'

export async function filter(req: FastifyRequest, res: FastifyReply) {
  const filterPetsBodySchema = z.object({
    city: z.string(),
    query: z.string(),
    page: z.number(),
  })

  const { city, query, page } = filterPetsBodySchema.parse(req.body)

  const filterPetsService = makeFilterPetService()
  const pets = await filterPetsService.execute({ city, query, page })

  return res.send({ pets })
}
