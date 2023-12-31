import { Request, Response } from "express";
import { makeCreateDeliveryUseCase } from "../factories/make-create-delivery-use-case";

export class CreateDeliveryController {
  async handle(request: Request, response: Response) {
    const { itemName } = request.body;

    const createDeliveryUseCase = makeCreateDeliveryUseCase();

    const { idClient } = request;

    await createDeliveryUseCase.execute({
      itemName,
      idClient,
    });

    return response.sendStatus(201);
  }
}
