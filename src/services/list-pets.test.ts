import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, expect, test } from 'vitest'
import { ListPetsService } from './list-pets'

let petsRepository: InMemoryPetsRepository
let sut: ListPetsService

describe('List pets', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new ListPetsService(petsRepository)

    for (let i = 0; i < 5; i++) {
      await petsRepository.create({
        animal: 'Cachorro',
        name: 'carlos',
        city: 'santa maria',
        org_id: 'id-de-teste',
      })
    }
    for (let i = 0; i < 5; i++) {
      await petsRepository.create({
        animal: 'Cachorro',
        name: 'carlos',
        city: 'santa maria',
        org_id: 'id-de-teste',
        adopted_at: new Date(),
      })
    }
  })

  test('Should be able to list pets', async () => {
    const { pets } = await sut.execute({ city: 'santa maria' })

    expect(pets).toHaveLength(5)
    expect(pets).toEqual([
      expect.objectContaining({
        city: 'santa maria',
      }),
      expect.objectContaining({
        city: 'santa maria',
      }),
      expect.objectContaining({
        city: 'santa maria',
      }),
      expect.objectContaining({
        city: 'santa maria',
      }),
      expect.objectContaining({
        city: 'santa maria',
      }),
    ])
  })

  test('Should not list adopted pets', async () => {
    for (let i = 0; i < 5; i++) {
      await petsRepository.create({
        animal: 'Cachorro',
        name: 'carlos',
        city: 'santa maria',
        org_id: 'id-de-teste',
        adopted_at: new Date(),
      })
    }

    const { pets } = await sut.execute({ city: 'santa maria' })

    expect(pets.every((pet) => pet.adopted_at === null)).toBeTruthy()
  })
})
