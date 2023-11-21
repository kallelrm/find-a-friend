import { describe, test, beforeEach, expect } from 'vitest'
import { AdoptPetService } from './adopt-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { PetAlreadyAdoptedError } from './errors/pet-already-adopted-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: AdoptPetService

describe('create pet', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AdoptPetService(petsRepository)

    await orgsRepository.create({
      id: 'id-de-teste',
      address: 'rua de teste',
      name: 'nome de teste',
      email: 'teste@example.com',
      phone: '5555999666333',
      password_hash: await hash('12345567', 6),
    })

    await petsRepository.create({
      id: '123',
      animal: 'Cachorro',
      name: 'carlos',
      description: 'manco',
      city: 'santa maria',
      org_id: 'id-de-teste',
    })
  })

  test('Should be able to adopt pet', async () => {
    const { pet } = await sut.execute({ id: '123' })
    expect(pet).toEqual(
      expect.objectContaining({
        name: 'carlos',
        city: 'santa maria',
        animal: 'Cachorro',
        id: expect.any(String),
        org_id: 'id-de-teste',
        adopted_at: expect.any(Date),
      }),
    )
  })

  test('should not be able to adopt inexistent pet', async () => {
    expect(async () => {
      await sut.execute({ id: '123123213' })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  test('should not be able to adopt already adopted pet', async () => {
    await sut.execute({ id: '123' })
    expect(async () => {
      await sut.execute({ id: '123' })
    }).rejects.toBeInstanceOf(PetAlreadyAdoptedError)
  })
})
