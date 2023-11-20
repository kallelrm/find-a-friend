import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterOrgService } from '../register'

export function makeRegisterService() {
  const orgsRepository = new PrismaOrgsRepository()
  const registerService = new RegisterOrgService(orgsRepository)

  return registerService
}
