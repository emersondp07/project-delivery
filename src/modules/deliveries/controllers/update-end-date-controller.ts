import { Request, Response } from "express";
import { UpdateEndDateUseCase } from "../use-cases/update-end-date-use-case";

export class UpdateEndDateController {
  async handle(request: Request, response: Response) {
    const updateEndDateUseCase = new UpdateEndDateUseCase();

    const { idDeliveryman } = request;

    const { id: idDelivery } = request.params;

    const delivery = await updateEndDateUseCase.execute({
      idDelivery,
      idDeliveryman,
    });

    return response.json(delivery);
  }
}
