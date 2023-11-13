import { CreateUserService } from './create-user'
import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

let usersRepository: InMemoryUsersRepository
let sut: CreateUserService
describe('create user', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateUserService(usersRepository)
  })

  test('Should be able to register a new user', async () => {
    const { user } = await sut.execute({
      name: 'kallel roman',
      email: 'kallelr@outlook.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
