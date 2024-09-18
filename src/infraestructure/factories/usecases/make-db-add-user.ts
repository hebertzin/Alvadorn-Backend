import { CreateUserService } from "../../../application/usecases/users/create-user-use-case";
import { ICreateUserService } from "../../../domain/CreateUserService";
import { BcryptHashService } from "../../bcrypt/BcryptHashServiceImpl";
import { UsersRepositoryImpl } from "../../db/repository/users/UsersRepositoryImpl";
import { loggerService } from "../../logger/LoggerService";

export const makeDbAddUser = (): ICreateUserService => {
  const dbAddUser = new UsersRepositoryImpl();
  const hash = new BcryptHashService();
  const addUserUseCase = new CreateUserService(dbAddUser, hash, loggerService);
  return addUserUseCase;
};
