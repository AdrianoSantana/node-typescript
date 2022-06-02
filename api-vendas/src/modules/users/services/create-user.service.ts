import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/users-repository";

interface IRequest {
  name: string,
  email: string,
  password: string
}
export class CreateUserService {
  public async execute({ name, email, password}: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository)
    const emailExists = await usersRepository.findByEmail(email)
    if (emailExists) {
      throw new AppError('Email already exists', 400)
    }
    const user = await usersRepository.create({
      name: name,
      email: email,
      password: password
    })
    await usersRepository.save(user)
    return user
  }
}
