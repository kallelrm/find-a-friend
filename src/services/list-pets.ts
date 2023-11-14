import { PetsRepository } from '@/repositories/pets-repository'
import type { Pet } from '@prisma/client'

interface ListPetsServiceRequest {
  city: string
}

interface ListPetsServiceResponse {
  pets: Pet[]
}

export class ListPetsService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: ListPetsServiceRequest): Promise<ListPetsServiceResponse> {
    const pets = await this.petsRepository.findNotAdoptedByCity(city)

    return { pets }
  }
}
