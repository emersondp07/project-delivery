import { Request, Response } from "express";
import { makeAuthenticateDeliverymanUseCase } from "../factories/make-authenticate-deliveryman-use-case";

export class AuthenticateDeliverymanController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const authenticateDeliverymanUseCase = makeAuthenticateDeliverymanUseCase();

    const result = await authenticateDeliverymanUseCase.execute({
      username,
      password,
    });

    return response.json(result);
  }
}
