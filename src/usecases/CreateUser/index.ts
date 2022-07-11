import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { MailtrapMailProvider } from "./../../providers/implementations/MailtrapMailProvider";
import { PostgresUsersrepository } from "./../../repositories/implementations/PostgresUsersRepository";

const postgresUsersRepository = new PostgresUsersrepository();
const mailtrapMailProvider = new MailtrapMailProvider();

const createUseCase = new CreateUserUseCase(postgresUsersRepository, mailtrapMailProvider);

const createUserController = new CreateUserController(createUseCase);

export { createUseCase, createUserController };
