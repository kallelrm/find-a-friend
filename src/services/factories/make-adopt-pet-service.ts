import { PrismaPetsRepoitory } from '@/repositories/prisma/prisma-pets-repository'
import { AdoptPetService } from '../adopt-pet'

export function makeAdoptPetService() {
  const petsRepository = new PrismaPetsRepoitory()
  const filterPetsService = new AdoptPetService(petsRepository)

  return filterPetsService
}
