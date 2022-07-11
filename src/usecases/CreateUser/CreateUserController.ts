import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password }: { name: string; email: string; password: string } = request["body"];

    try {
      await this.createUserUseCase.execute({
        name,
        email,
        password,
      });

      return response.status(201).send();
    } catch (err) {
      return response.status(500).send({
        message: err["message"] || "Unexpected error.",
      });
    }
  }
}
