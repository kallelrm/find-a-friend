import { PrismaPetsRepoitory } from '@/repositories/prisma/prisma-pets-repository'
import { ListPetsService } from '../list-pets'

export function makeListPetService() {
  const petsRepository = new PrismaPetsRepoitory()
  const listPetsService = new ListPetsService(petsRepository)

  return listPetsService
}
