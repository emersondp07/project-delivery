import { DeliverymanRepository } from "../repositories/deliveryman-repository";

export class FindAllAvailableUseCase {
  constructor(private deliverymanRepository: DeliverymanRepository) {}

  async execute() {
    const deliveries = this.deliverymanRepository.findMany();

    return deliveries;
  }
}
