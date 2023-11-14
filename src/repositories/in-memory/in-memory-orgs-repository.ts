import { Prisma, Org } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []
  async create(data: Prisma.OrgCreateInput) {
    const org: Org = {
      id: data.id ?? randomUUID(),
      address: data.address,
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      phone: data.phone,
    }

    this.items.push(org)
    return org
  }

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }
    return org
  }
}
