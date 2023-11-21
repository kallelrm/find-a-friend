import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/services/errors/resource-not-found'
import { makeAdoptPetService } from '@/services/factories/make-adopt-pet-service'
import { PetAlreadyAdoptedError } from '@/services/errors/pet-already-adopted-error'

export async function adopt(req: FastifyRequest, res: FastifyReply) {
  const adoptPetParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = adoptPetParamsSchema.parse(req.params)

  try {
    const adoptPetService = makeAdoptPetService()
    const pet = await adoptPetService.execute({ id })

    return pet
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).send({
        message: error.message,
      })
    }
    if (error instanceof PetAlreadyAdoptedError) {
      return res.status(409).send({
        message: error.message,
      })
    }

    throw error
  }
}
