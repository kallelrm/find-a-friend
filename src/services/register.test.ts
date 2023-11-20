import { describe, test, beforeEach, expect } from 'vitest'
import { RegisterOrgService } from './register'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { compare } from 'bcryptjs'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgService

describe('Register Org', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgService(orgsRepository)
  })

  test('should be able to register new org', async () => {
    const { org } = await sut.execute({
      name: 'org de teste',
      phone: '5555999666333',
      address: 'Rua daqui',
      email: 'org-de-teste@gmail.com',
      password: '12345678',
    })

    const isValidPassword = await compare('12345678', org.password_hash)
    expect(isValidPassword).toBeTruthy()
  })

  test('should not be able to register the same org twice', async () => {
    await sut.execute({
      name: 'org de teste',
      phone: '5555999666333',
      address: 'Rua daqui',
      email: 'org-de-teste@gmail.com',
      password: '12345678',
    })
    expect(async () => {
      await sut.execute({
        name: 'org de teste',
        phone: '5555999666333',
        address: 'Rua daqui',
        email: 'org-de-teste@gmail.com',
        password: '12345678',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
