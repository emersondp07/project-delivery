import { prisma } from "../../../prisma/prisma";

interface UpdateDeliveryUseCaseRequest {
  idDelivery: string;
  idDeliveryman: string;
}

export class UpdateDeliveryUseCase {
  async execute({ idDelivery, idDeliveryman }: UpdateDeliveryUseCaseRequest) {
    const result = await prisma.delivery.update({
      where: {
        id: idDelivery,
      },
      data: {
        id_deliveryman: idDeliveryman,
      },
    });

    return result;
  }
}
