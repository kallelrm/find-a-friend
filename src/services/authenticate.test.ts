import { describe, beforeEach, test, expect } from 'vitest'
import { AuthenticateService } from './authenticate'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { compare, hash } from 'bcryptjs'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateService

describe('authenticate', () => {
  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateService(orgsRepository)

    await orgsRepository.create({
      name: 'org de teste',
      phone: '5555999666333',
      address: 'Rua daqui',
      email: 'org-de-teste@gmail.com',
      password_hash: await hash('12345678', 6),
    })
  })

  test('should be able to authenticate', async () => {
    const { org } = await sut.execute({
      email: 'org-de-teste@gmail.com',
      password: '12345678',
    })

    const isValidPassword = await compare('12345678', org.password_hash)

    expect(isValidPassword).toBeTruthy()
  })

  test('should not be able to authenticate with wrong password', () => {
    expect(async () => {
      await sut.execute({
        email: 'org-de-teste@gmail.com',
        password: '12345',
      })
    }).rejects.toBeInstanceOf(Error)
  })

  test('should not be able to authenticate with unexisting mail', () => {
    expect(async () => {
      await sut.execute({
        email: 'ruim@ruim.com',
        password: '12345678',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
