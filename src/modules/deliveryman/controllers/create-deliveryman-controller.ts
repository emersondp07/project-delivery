import { Request, Response } from "express";
import { makeCreateDeliverymanUseCase } from "../factories/make-create-deliveryman-use-case";

export class CreateDeliverymanController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    try {
      const createDeliverymanUseCase = makeCreateDeliverymanUseCase();

      await createDeliverymanUseCase.execute({
        username,
        password,
      });
    } catch (error) {}
  }
}
