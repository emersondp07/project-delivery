import { Request, Response } from "express";
import { makeFindAllAvailableUseCase } from "../factories/make-find-all-available-use-case";

export class FindAllAvailableController {
  async handle(request: Request, response: Response) {
    const findAllAvailableUseCase = makeFindAllAvailableUseCase();

    const delivery = await findAllAvailableUseCase.execute();

    return response.json(delivery);
  }
}
