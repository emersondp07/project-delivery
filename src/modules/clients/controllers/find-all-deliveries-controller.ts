import { Request, Response } from "express";
import { makeFindAllDeliveriesDeliverymanUseCase } from "../factories/make-find-all-deliveries-use-case";

export class FindAllDeliveriesController {
  async handle(request: Request, response: Response) {
    const findAllDeliveriesUseCase = makeFindAllDeliveriesDeliverymanUseCase();

    const { idClient } = request;

    const deliveries = await findAllDeliveriesUseCase.execute(idClient);

    return response.json(deliveries);
  }
}
