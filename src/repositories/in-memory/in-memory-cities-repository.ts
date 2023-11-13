import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []
  async create({ animal, city, name, org, id }: Prisma.PetCreateInput) {
    const pet = {
      id: id ?? randomUUID(),
      name,
      animal,
      city,
      org,
    }
    this.items.push(pet)
    return { pet }
  }
}
