import { prisma } from "../../../prisma/prisma";

interface CreateDeliveryUseCaseRequest {
  itemName: string;
  idClient: string;
}

export class CreateDeliveryUseCase {
  async execute({ itemName, idClient }: CreateDeliveryUseCaseRequest) {
    const delivery = await prisma.delivery.create({
      data: {
        item_name: itemName,
        id_client: idClient,
      },
    });

    return delivery;
  }
}
