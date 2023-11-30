import { DeliverymanRepository } from "../repositories/deliveryman-repository";

export class FindAllDeliveriesDeliverymanUseCase {
  constructor(private deliverymanRepository: DeliverymanRepository) {}

  async execute(idDeliveryman: string) {
    const deliveries = this.deliverymanRepository.findMany(idDeliveryman);

    return deliveries;
  }
}
