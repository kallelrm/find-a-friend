import { describe, test, beforeEach, expect } from 'vitest'
import { DetailPetService } from './detail-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: DetailPetService

describe('Detail pet', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new DetailPetService(petsRepository, orgsRepository)

    await orgsRepository.create({
      id: 'id-de-teste',
      address: 'rua',
      email: 'email@example.com',
      name: 'org',
      password_hash: '123213213213',
      phone: '5551999666333',
    })

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
    const pet = await sut.execute({ id: '1' })
    expect(pet.id).toBe('1')
    expect(pet.phone).toBe('5551999666333')
  })

  test('Should throw error when searching for inexisting pet', async () => {
    expect(async () => {
      await sut.execute({ id: '23123213213213' })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
