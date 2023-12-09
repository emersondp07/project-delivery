import { Prisma } from "@prisma/client";
import { prisma } from "../../../prisma/prisma";
import { ClientRepository } from "./client-repository";

export class PrismaClientRepository implements ClientRepository {
  async findByUsername(username: string) {
    const clientExist = await prisma.client.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    return clientExist;
  }

  async createClient(data: Prisma.ClientCreateInput) {
    const client = await prisma.client.create({
      data,
    });

    return client;
  }

  async findUnique(idClient: string) {
    // rever
    const client = await prisma.client.findUnique({
      where: {
        id: idClient,
      },
    });

    return client;
  }

  async findManyByIdClient(idClient: string) {
    //rever
    const deliveries = await prisma.client.findMany({
      where: {
        id: idClient,
      },
      select: {
        id: true,
        username: true,
        deliveries: true,
      },
    });

    return deliveries;
  }

  async createOneDelivery(itemName: string, idClient: string) {
    const delivery = await prisma.delivery.create({
      data: {
        item_name: itemName,
        id_client: idClient,
      },
    });

    return delivery;
  }
}
