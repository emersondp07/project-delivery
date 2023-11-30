import { Request, Response } from "express";
import { makeFindAllDeliveriesDeliverymanUseCase } from "../factories/make-find-all-deliveries-deliveryman-use-case";

export class FindAllDeliveriesDeliverymanController {
  async handle(request: Request, response: Response) {
    const findAllDeliveriesDeliverymanUseCase =
      makeFindAllDeliveriesDeliverymanUseCase();

    const { idDeliveryman } = request;

    const deliveries = await findAllDeliveriesDeliverymanUseCase.execute(
      idDeliveryman
    );

    return response.json(deliveries);
  }
}
