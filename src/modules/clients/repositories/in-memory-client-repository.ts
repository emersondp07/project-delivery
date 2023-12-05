import { Client, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { ClientRepository } from "./client-repository";

export class InMemoryClientsRepository implements ClientRepository {
  public items: Client[] = [];

  async findByUsername(username: string) {
    const client = this.items.find((item) => item.username === username);

    if (!client) {
      return null;
    }

    return client;
  }

  async findManyByClient(idClient: string): Promise<any> {
    const deliveries = this.items.filter((item) => item.id === idClient);

    return deliveries;
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
}
