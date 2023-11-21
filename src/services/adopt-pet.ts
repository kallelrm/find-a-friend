import { PetsRepository } from '@/repositories/pets-repository'
import type { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { PetAlreadyAdoptedError } from './errors/pet-already-adopted-error'

interface AdoptPetServiceRequest {
  id: string
}

interface AdoptPetServiceResponse {
  pet: Pet
}

export class AdoptPetService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
  }: AdoptPetServiceRequest): Promise<AdoptPetServiceResponse> {
    let pet = await this.petsRepository.queryPetById(id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    if (pet.adopted_at) {
      throw new PetAlreadyAdoptedError()
    }

    pet = await this.petsRepository.adoptById(id)

    return { pet }
  }
}
