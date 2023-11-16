import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { beforeEach, describe, test, expect } from 'vitest'
import { FilterPetsService } from './filter-pets'

let petsRepository: InMemoryPetsRepository
let sut: FilterPetsService

const arr = ['manco', 'manco', 'surdo', 'mudo', '']

describe('Filter pets', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FilterPetsService(petsRepository)

    for (let i = 0; i < 5; i++) {
      await petsRepository.create({
        animal: 'Cachorro',
        name: 'carlos',
        city: 'santa maria',
        description: arr[i],
        org_id: 'id-de-teste',
      })
    }
  })

  test('Should be able to filter pets', async () => {
    const { pets } = await sut.execute({
      query: 'manco',
      city: 'santa maria',
      page: 1,
    })
    expect(pets).toHaveLength(2)
  })
})
