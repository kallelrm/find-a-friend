import { Pet, Prisma } from '@prisma/client'

export interface IQueryPetsByFilter {
  city: string
  page: number
  query: string
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findNotAdoptedByCity(city: string): Promise<Pet[]>
  queryPetsByFilter(data: IQueryPetsByFilter): Promise<Pet[]>
}
