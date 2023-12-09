import { Prisma } from "@prisma/client";
import { prisma } from "../../../prisma/prisma";
import { DeliverymanRepository } from "./deliveryman-repository";

export class PrismaDeliverymanRepository implements DeliverymanRepository {
  async findByUsername(username: string) {
    const deliverymanExist = await prisma.deliveryman.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    return deliverymanExist;
  }

  async findManyByDeliverymanId(idDeliveryman: string) {
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

  async createDeliveveryman(data: Prisma.DeliverymanCreateInput) {
    const client = await prisma.deliveryman.create({
      data,
    });

    return client;
  }

  async findMany() {
    const deliveries = await prisma.delivery.findMany({
      where: {
        end_at: null,
        id_deliveryman: null,
      },
    });

    return deliveries;
  }

  async updateInitialDelivery(idDelivery: string, idDeliveryman: string) {
    await prisma.delivery.update({
      where: {
        id: idDelivery,
      },
      data: {
        id_deliveryman: idDeliveryman,
      },
    });

    return { message: "Entrega aceita!" };
  }

  async updateFinisheDelivery(idDelivery: string, idDeliveryman: string) {
    await prisma.delivery.updateMany({
      where: {
        id: idDelivery,
        id_deliveryman: idDeliveryman,
      },
      data: {
        end_at: new Date(),
      },
    });

    return { message: "Entrega finalizada!" };
  }
}
