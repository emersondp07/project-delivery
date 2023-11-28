import { Request, Response } from "express";
import { FindAllDeliveriesDeliverymanUseCase } from "../use-cases/find-all-deliveries-deliveryman-use-case";

export class FindAllDeliveriesDeliverymanController {
  async handle(request: Request, response: Response) {
    const findAllDeliveriesDeliverymanUseCase =
      new FindAllDeliveriesDeliverymanUseCase();

    const { idDeliveryman } = request;

    const deliveries = await findAllDeliveriesDeliverymanUseCase.execute(
      idDeliveryman
    );

    return response.json(deliveries);
  }
}
