import { Request, Response } from "express";
import { makeUpdateEndDateUseCase } from "../factories/make-update-end-date-use-case";

export class UpdateEndDateController {
  async handle(request: Request, response: Response) {
    const updateEndDateUseCase = makeUpdateEndDateUseCase();

    const { idDeliveryman } = request;

    const { id: idDelivery } = request.params;

    const delivery = await updateEndDateUseCase.execute({
      idDelivery,
      idDeliveryman,
    });

    return response.sendStatus(204);
  }
}
