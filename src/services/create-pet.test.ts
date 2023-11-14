import { describe, test, beforeEach, expect } from 'vitest'
import { CreatePetService } from './create-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: CreatePetService

describe('create pet', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreatePetService(petsRepository, orgsRepository)

    await orgsRepository.create({
      id: 'id-de-teste',
      address: 'rua de teste',
      name: 'nome de teste',
      email: 'teste@example.com',
      phone: '5555999666333',
      password_hash: await hash('12345567', 6),
    })
  })

  test('Should be able to create pet', async () => {
    const { pet } = await sut.execute({
      animal: 'Cachorro',
      name: 'carlos',
      city: 'santa maria',
      orgId: 'id-de-teste',
    })

    expect(pet).toEqual(
      expect.objectContaining({
        name: 'carlos',
        city: 'santa maria',
        animal: 'Cachorro',
        id: expect.any(String),
        org_id: 'id-de-teste',
      }),
    )
  })
  test('Should not be able to create pet on unexistent org', async () => {
    expect(async () => {
      await sut.execute({
        name: 'carlos',
        city: 'santa maria',
        animal: 'Cachorro',
        orgId: 'id-de-testes',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
