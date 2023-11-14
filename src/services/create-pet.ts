import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import type { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface CreatePetServiceRequest {
  name: string
  city: string
  animal: string
  orgId: string
}

interface CreatePetServiceResponse {
  pet: Pet
}

export class CreatePetService {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    animal,
    city,
    orgId,
  }: CreatePetServiceRequest): Promise<CreatePetServiceResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      city,
      animal,
      org_id: orgId,
    })
    return { pet }
  }
}
