import { User, Prisma, $Enums } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []
  async create({
    id,
    password_hash,
    email,
    name,
    role,
  }: Prisma.UserCreateInput) {
    const user = {
      id: id ?? randomUUID(),
      name,
      password_hash,
      email,
      role: role ?? 'USER',
    }
    this.items.push(user)
    return user
  }

  async findUserByEmail(email: string) {
    const user = this.items.find((elm) => elm.email === email)
    if (!user) {
      return null
    }
    return user
  }
}
