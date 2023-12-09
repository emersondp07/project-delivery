import { DeliverymanRepository } from "../repositories/deliveryman-repository";

interface UpdateEndDateCaseRequest {
  idDelivery: string;
  idDeliveryman: string;
}

export class UpdateEndDateUseCase {
  constructor(private deliverymanRepository: DeliverymanRepository) {}

  async execute({ idDelivery, idDeliveryman }: UpdateEndDateCaseRequest) {
    const result = await this.deliverymanRepository.updateFinisheDelivery(
      idDelivery,
      idDeliveryman
    );

    return result;
  }
}
