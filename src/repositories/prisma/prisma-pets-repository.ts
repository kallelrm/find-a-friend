import { Pet, Prisma } from '@prisma/client'
import { IQueryPetsByFilter, PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepoitory implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data })

    return pet
  }

  async findNotAdoptedByCity(city: string) {
    const pets = await prisma.pet.findMany({
      where: { city, adopted_at: null },
    })

    return pets
  }

  async queryPetsByFilter(data: IQueryPetsByFilter) {
    // const pets = await prisma.pet.findMany({
    //   where: {
    //     city: data.city,
    //     AND: {
    //       OR: [
    //         {
    //           city: { contains: data.query },
    //         },
    //         {
    //           name: { contains: data.query },
    //         },
    //         {
    //           description: { contains: data.query },
    //         },
    //         {
    //           animal: { contains: data.query },
    //         },
    //       ],
    //     },
    //   },
    // })
    const pets = await prisma.$queryRaw<
      Pet[]
    >`SELECT * FROM pets WHERE city ILIKE %${data.city}% AND name ILIKE %${data.query}% OR animal ILIKE %${data.query}% OR description ILIKE %${data.query}%;`

    return pets
  }

  async queryPetById(id: string) {
    const pet = await prisma.pet.findFirst({ where: { id } })
    return pet
  }
}
