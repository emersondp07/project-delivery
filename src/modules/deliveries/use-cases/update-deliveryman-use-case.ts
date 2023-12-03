import { DeliveriesRepository } from "../repositories/deliveries-repository";

interface UpdateDeliveryUseCaseRequest {
  idDelivery: string;
  idDeliveryman: string;
}

export class UpdateDeliveryUseCase {
  // Promise
  constructor(private deliveriesRepository: DeliveriesRepository) {}

  async execute({ idDelivery, idDeliveryman }: UpdateDeliveryUseCaseRequest) {
    const result = this.deliveriesRepository.update(idDelivery, idDeliveryman);

    return result;
  }
}
