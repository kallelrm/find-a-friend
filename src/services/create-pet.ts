import { PetsRepository } from '@/repositories/pets-repository'
import type { Pet } from '@prisma/client'

interface CreatePetServiceRequest {
  name: string
  city_id: string
  animal: string
  org_id: string
}

interface CreatePetServiceResponse {
  pet: Pet
}

export class CreatePetService {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    animal,
    city_id,
    org_id,
  }: CreatePetServiceRequest): Promise<CreatePetServiceResponse> {
    const pet = await this.petsRepository.create({
      name,
      city: city_id,
      animal,
      org: org_id,
    })
    return pet
  }
}
