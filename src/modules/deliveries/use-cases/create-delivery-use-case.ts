import { Delivery } from "@prisma/client";
import { DeliveriesRepository } from "../repositories/deliveries-repository";

interface CreateDeliveryUseCaseRequest {
  itemName: string;
  idClient: string;
}

interface CreateDeliveryUseCaseResponse {
  delivery: Delivery;
}

export class CreateDeliveryUseCase {
  constructor(private deliveriesRepository: DeliveriesRepository) {}
  async execute({
    itemName,
    idClient,
  }: CreateDeliveryUseCaseRequest): Promise<CreateDeliveryUseCaseResponse> {
    const delivery = await this.deliveriesRepository.create(itemName, idClient);

    return { delivery };
  }
}
