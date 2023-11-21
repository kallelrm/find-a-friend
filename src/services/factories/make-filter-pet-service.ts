import { PrismaPetsRepoitory } from '@/repositories/prisma/prisma-pets-repository'
import { FilterPetsService } from '../filter-pets'

export function makeFilterPetService() {
  const petsRepository = new PrismaPetsRepoitory()
  const filterPetsService = new FilterPetsService(petsRepository)

  return filterPetsService
}
