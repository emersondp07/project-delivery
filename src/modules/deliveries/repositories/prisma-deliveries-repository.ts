import { prisma } from "../../../prisma/prisma";
import { DeliveriesRepository } from "./deliveries-repository";

export class PrismaDeliveriesRepository implements DeliveriesRepository {
  async findMany() {
    const deliveries = await prisma.delivery.findMany({
      where: {
        end_at: null,
        id_deliveryman: null,
      },
    });

    return deliveries;
  }

  async findUnique(idClient: string) {
    const client = await prisma.client.findUnique({
      where: {
        id: idClient,
      },
    });

    return client;
  }
  async create(itemName: string, idClient: string) {
    const delivery = await prisma.delivery.create({
      data: {
        item_name: itemName,
        id_client: idClient,
      },
    });

    return delivery;
  }

  async update(idDelivery: string, idDeliveryman: string) {
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

  async updateMany(idDelivery: string, idDeliveryman: string) {
    const result = await prisma.delivery.updateMany({
      where: {
        id: idDelivery,
        id_deliveryman: idDeliveryman,
      },
      data: {
        end_at: new Date(),
      },
    });

    return { message: "Foi finalizado a entrega!" };
  }
}
