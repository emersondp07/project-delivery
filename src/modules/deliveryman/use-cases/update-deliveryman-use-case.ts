import { DeliverymanRepository } from "../repositories/deliveryman-repository";

interface UpdateDeliveryUseCaseRequest {
  idDelivery: string;
  idDeliveryman: string;
}

export class UpdateDeliveryUseCase {
  // Promise
  constructor(private deliverymanRepository: DeliverymanRepository) {}

  async execute({ idDelivery, idDeliveryman }: UpdateDeliveryUseCaseRequest) {
    const result = this.deliverymanRepository.updateInitialDelivery(
      idDelivery,
      idDeliveryman
    );

    return result;
  }
}
