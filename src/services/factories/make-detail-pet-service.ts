import { PrismaPetsRepoitory } from '@/repositories/prisma/prisma-pets-repository'
import { DetailPetService } from '../detail-pet'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeDetailPetService() {
  const petsRepository = new PrismaPetsRepoitory()
  const orgsRepository = new PrismaOrgsRepository()
  const detailPetService = new DetailPetService(petsRepository, orgsRepository)

  return detailPetService
}
