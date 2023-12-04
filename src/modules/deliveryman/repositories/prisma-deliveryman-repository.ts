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

  async findMany(idDeliveryman: string): Promise<any> {
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
}
