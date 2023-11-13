import { UsersRepository } from '@/repositories/users-repository'
import type { User } from '@prisma/client'
import { hash } from 'bcryptjs'

interface CreateUserServiceRequest {
  name: string
  email: string
  password: string
}

interface CreateUserServiceResponse {
  user: User
}

export class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserServiceRequest): Promise<CreateUserServiceResponse> {
    const password_hash = await hash(password, 6)

    const userAlreadyExists = await this.usersRepository.findUserByEmail(email)

    if (userAlreadyExists) {
      throw new Error('User Already Exists')
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
    return { user }
  }
}
