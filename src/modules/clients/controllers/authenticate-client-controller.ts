import { Request, Response } from "express";
import { makeAuthenticateClientUseCase } from "../factories/make-authenticate-client-use-case";

export class AuthenticateClientController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const authenticateClientUseCase = makeAuthenticateClientUseCase();

    const result = await authenticateClientUseCase.execute({
      username,
      password,
    });

    return response.json(result);
  }
}
