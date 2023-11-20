import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { AuthenticateService } from '../authenticate'

export function makeAuthenticateService() {
  const orgsRepository = new PrismaOrgsRepository()
  const registerService = new AuthenticateService(orgsRepository)

  return registerService
}
