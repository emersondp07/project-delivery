import { DeliveriesRepository } from "../repositories/deliveries-repository";

export class FindAllAvailableUseCase {
  constructor(private deliveriesRepository: DeliveriesRepository) {}

  async execute() {
    const deliveries = this.deliveriesRepository.findMany();

    return deliveries;
  }
}
