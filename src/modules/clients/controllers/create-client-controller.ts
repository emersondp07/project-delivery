import { Request, Response } from "express";
import { makeCreateClientUseCase } from "../factories/make-create-client-use-case";

export class CreateClientController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const createClientUseCase = makeCreateClientUseCase();

    await createClientUseCase.execute({
      username,
      password,
    });

    return response.sendStatus(201);
  }
}
