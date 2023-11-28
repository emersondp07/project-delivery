import { Request, Response } from "express";
import { FindAllDeliveriesUseCase } from "../use-cases/find-all-deliveries-use-case";

export class FindAllDeliveriesController {
  async handle(request: Request, response: Response) {
    const findAllDeliveriesUseCase = new FindAllDeliveriesUseCase();

    const { idClient } = request;

    const deliveries = await findAllDeliveriesUseCase.execute(idClient);

    return response.json(deliveries);
  }
}
