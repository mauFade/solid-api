import { User } from "../entitites/User";

export interface IUserRepository {
  findByEmail(email: string): Promise<User>;
  save(user: User): Promise<void>;
}
