import { Request, Response } from "express";
import { UpdateDeliveryUseCase } from "../use-cases/update-deliveryman-use-case";

export class UpdateDeliveryController {
  async handle(request: Request, response: Response) {
    const updateDeliveryUseCase = new UpdateDeliveryUseCase();

    const { idDeliveryman } = request;

    const { id: idDelivery } = request.params;

    const delivery = await updateDeliveryUseCase.execute({
      idDelivery,
      idDeliveryman,
    });

    return response.json(delivery);
  }
}
