import { Delivery } from "@prisma/client";
import { ClientRepository } from "../repositories/client-repository";

interface CreateDeliveryUseCaseRequest {
  itemName: string;
  idClient: string;
}

interface CreateDeliveryUseCaseResponse {
  delivery: Delivery;
}

export class CreateDeliveryUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute({
    itemName,
    idClient,
  }: CreateDeliveryUseCaseRequest): Promise<CreateDeliveryUseCaseResponse> {
    const delivery = await this.clientRepository.createOneDelivery(
      itemName,
      idClient
    );

    return { delivery };
  }
}
