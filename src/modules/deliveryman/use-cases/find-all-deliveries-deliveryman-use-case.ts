import { prisma } from "../../../prisma/prisma";

export class FindAllDeliveriesDeliverymanUseCase {
  async execute(idDeliveryman: string) {
    const deliveries = await prisma.deliveryman.findMany({
      where: {
        id: idDeliveryman,
      },
      select: {
        id: true,
        username: true,
        deliveries: true,
      },
    });

    return deliveries;
  }
}
