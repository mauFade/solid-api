import { IMailProvider } from "./../../providers/IMailProvider";
import { User } from "./../../entitites/User";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { IUserRepository } from "./../../repositories/IUserRepository";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository, private mailProvider: IMailProvider) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error("User already exists.");
    }

    const user = new User(data);

    await this.userRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
        email: data.email,
        name: data.name,
      },
      from: {
        name: "Equipe fictícia",
        email: "equipeqnexiste@email.com",
      },
      subject: "Bem-vindo à plataforma",
      body: "<p>Você já pode fazer login em nossos serviços</p>",
    });
  }
}
