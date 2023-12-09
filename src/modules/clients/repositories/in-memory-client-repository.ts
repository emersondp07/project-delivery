import { Client, Delivery, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { ClientRepository } from "./client-repository";

export class InMemoryClientsRepository implements ClientRepository {
  public items: Client[] = [];
  public deliveries: Delivery[] = [];

  async findByUsername(username: string) {
    const client = this.items.find((item) => item.username === username);

    if (!client) {
      return null;
    }

    return client;
  }

  async findUnique(idClient: string) {
    const client = this.items.find((item) => item.id === idClient);

    if (!client) {
      return null;
    }

    return client;
  }

  async createClient(data: Prisma.ClientCreateInput) {
    const client = {
      id: randomUUID(),
      username: data.username,
      password: data.password,
    };

    this.items.push(client);

    return client;
  }

  async findManyByIdClient(idClient: string): Promise<any> {
    const deliveries = this.deliveries.filter(
      (item) => item.id_client === idClient
    );

    return deliveries;
  }

  async createOneDelivery(itemName: string, idClient: string) {
    const delivery = {
      id: randomUUID(),
      item_name: itemName,
      id_client: idClient,
      id_deliveryman: null,
      created_at: new Date(),
      end_at: null,
    };

    this.deliveries.push(delivery);

    return delivery;
  }
}
