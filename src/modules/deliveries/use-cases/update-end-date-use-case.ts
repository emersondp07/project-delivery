import { DeliveriesRepository } from "../repositories/deliveries-repository";

interface UpdateEndDateCaseRequest {
  idDelivery: string;
  idDeliveryman: string;
}

export class UpdateEndDateUseCase {
  constructor(private deliveriesRepository: DeliveriesRepository) {}

  async execute({ idDelivery, idDeliveryman }: UpdateEndDateCaseRequest) {
    const result = await this.deliveriesRepository.updateMany(
      idDelivery,
      idDeliveryman
    );

    return result;
  }
}
