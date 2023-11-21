import { PrismaPetsRepoitory } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetService } from '../create-pet'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeCreatePetService() {
  const petsRepository = new PrismaPetsRepoitory()
  const orgsRepository = new PrismaOrgsRepository()
  const createPetService = new CreatePetService(petsRepository, orgsRepository)

  return createPetService
}
