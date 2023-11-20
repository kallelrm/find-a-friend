import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface DetailPetServiceRequest {
  id: string
}
interface DetailPetServiceResponse {
  pet: Pet
}

export class DetailPetService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
  }: DetailPetServiceRequest): Promise<DetailPetServiceResponse> {
    const pet = await this.petsRepository.queryPetById(id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }
}
