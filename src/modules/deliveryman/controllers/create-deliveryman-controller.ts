import { Request, Response } from "express";
import { makeCreateDeliverymanUseCase } from "../factories/make-create-deliveryman-use-case";

export class CreateDeliverymanController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const createDeliverymanUseCase = makeCreateDeliverymanUseCase();

    await createDeliverymanUseCase.execute({
      username,
      password,
    });

    return response.sendStatus(201);
  }
}
