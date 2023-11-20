import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { OrgsRepository } from '@/repositories/orgs-repository'

interface DetailPetServiceRequest {
  id: string
}
interface DetailPetServiceResponse extends Pet {
  phone: string
}

export class DetailPetService {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    id,
  }: DetailPetServiceRequest): Promise<DetailPetServiceResponse> {
    const pet = await this.petsRepository.queryPetById(id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    const org = await this.orgsRepository.findById(pet.org_id)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    return { phone: org.phone, ...pet }
  }
}
