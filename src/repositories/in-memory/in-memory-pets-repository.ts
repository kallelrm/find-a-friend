import { Pet, Prisma } from '@prisma/client'
import { IQueryPetsByFilter, PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      animal: data.animal,
      city: data.city,
      description: data.description ?? '',
      org_id: data.org_id,
      created_at: new Date(),
      adopted_at: data.adopted_at ? new Date(data.adopted_at) : null,
    }
    this.items.push(pet)
    return pet
  }

  async findNotAdoptedByCity(city: string) {
    const pets: Pet[] = this.items
      .filter((item) => item.city.toUpperCase() === city.toUpperCase())
      .filter((item) => !item.adopted_at)

    return pets
  }

  async queryPetsByFilter(data: IQueryPetsByFilter) {
    const pets: Pet[] =
      this.items
        .filter((item) => item.city.toUpperCase() === data.city.toUpperCase())
        .filter(
          (item) =>
            item.description?.toUpperCase().includes(data.query.toUpperCase()),
        ) ?? []

    return pets
  }

  async queryPetById(id: string) {
    const pet = this.items.find((item) => item.id === id)
    if (!pet) {
      return null
    }

    return pet
  }
}
