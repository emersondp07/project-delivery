import { Request, Response } from "express";
import { makeCreateUseCase } from "../factories/make-create-deliveryman-use-case";

export class CreateDeliverymanController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    try {
      const createUseCase = makeCreateUseCase();

      await createUseCase.execute({
        username,
        password,
      });
    } catch (error) {}
  }
}
