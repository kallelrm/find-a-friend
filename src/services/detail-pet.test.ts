import { describe, test, beforeEach, expect } from 'vitest'
import { PetsRepository } from '@/repositories/pets-repository'
import { DetailPetService } from './detail-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'

let petsRepository: PetsRepository
let sut: DetailPetService

describe('Detail pet', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new DetailPetService(petsRepository)

    for (let i = 0; i < 5; i++) {
      await petsRepository.create({
        id: '' + i,
        animal: 'Cachorro',
        name: 'carlos',
        city: 'santa maria',
        org_id: 'id-de-teste',
      })
    }
  })

  test('Should be able to get pet details', async () => {
    const { pet } = await sut.execute({ id: '1' })
    expect(pet.id).toBe('1')
  })

  test('Should throw error when searching for inexisting pet', async () => {
    expect(async () => {
      await sut.execute({ id: '23123213213213' })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
