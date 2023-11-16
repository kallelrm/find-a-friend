import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FilterPetsServiceRequest {
  query: string
  city: string
  page: number
}

interface FilterPetsServiceResponse {
  pets: Pet[]
}

export class FilterPetsService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    query,
    city,
    page,
  }: FilterPetsServiceRequest): Promise<FilterPetsServiceResponse> {
    const pets = await this.petsRepository.queryPetsByFilter({
      page,
      city,
      query,
    })

    return { pets }
  }
}
