import { OrgsRepository } from '@/repositories/orgs-repository'
import type { Org } from '@prisma/client'
import { hash } from 'bcryptjs'

interface RegisterOrgServiceRequest {
  name: string
  phone: string
  address: string
  email: string
  password: string
}

interface RegisterOrgServiceResponse {
  org: Org
}

export class RegisterOrgService {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    phone,
    address,
    email,
    password,
  }: RegisterOrgServiceRequest): Promise<RegisterOrgServiceResponse> {
    const password_hash = await hash(password, 6)

    const orgAlreadyExists = await this.orgsRepository.findByEmail(email)

    if (orgAlreadyExists) {
      throw new Error('Org already exisits')
    }

    const org = await this.orgsRepository.create({
      name,
      phone,
      address,
      email,
      password_hash,
    })
    return { org }
  }
}
