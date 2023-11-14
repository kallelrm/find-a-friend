import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      animal: data.animal,
      city: data.city,
      org_id: data.org_id,
    }
    this.items.push(pet)
    return pet
  }
}
