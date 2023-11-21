import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreatePetService } from '@/services/factories/make-create-pet-service'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found'

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    animal: z.string(),
    description: z.string(),
    city: z.string(),
    orgId: z.string(),
  })

  const { name, animal, description, city, orgId } = createPetBodySchema.parse(
    req.body,
  )

  try {
    const createPetService = makeCreatePetService()
    const pet = await createPetService.execute({
      animal,
      city,
      description,
      name,
      orgId,
    })

    return pet
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).send({
        message: error.message,
      })
    }

    throw error
  }
}
