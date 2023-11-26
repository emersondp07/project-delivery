import { Request, Response } from "express";
import { CreateDeliveryUseCase } from "../use-cases/create-delivery-use-case";

export class CreateDeliveryController {
  async handle(request: Request, response: Response) {
    const { itemName } = request.body;

    const createDeliveryUseCase = new CreateDeliveryUseCase();

    const { idClient } = request;

    const delivery = await createDeliveryUseCase.execute({
      itemName,
      idClient,
    });

    return response.json(delivery);
  }
}
