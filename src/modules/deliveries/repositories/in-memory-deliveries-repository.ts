import { Client, Delivery } from "@prisma/client";
import { randomUUID } from "crypto";
import { DeliveriesRepository } from "./deliveries-repository";

export class InMemoryDeliveriesRepository implements DeliveriesRepository {
  public items: Delivery[] = [];
  public clients: Client[] = [];

  async findMany() {
    const deliveries = this.items.filter((item) => {
      item.end_at === null && item.id_deliveryman === null;
    });

    return deliveries;
  }

  async findUnique(idClient: string) {
    const client = this.clients.find((item) => item.id === idClient);

    if (!client) {
      return null;
    }

    return client;
  }

  async create(itemName: string, idClient: string) {
    const delivery = {
      id: randomUUID(),
      item_name: itemName,
      id_client: idClient,
      id_deliveryman: null,
      created_at: new Date(),
      end_at: null,
    };

    this.items.push(delivery);

    return delivery;
  }

  async update(idDelivery: string, idDeliveryman: string) {
    const delivery = this.items.find((item) => item.id === idDelivery);

    if (delivery) {
      delivery.id_deliveryman = idDeliveryman;
    }

    return { message: "Foi inicializado a entrega!" };
  }

  async updateMany(idDelivery: string, idDeliveryman: string) {
    const delivery = this.items.find(
      (item) => item.id === idDelivery && item.id_deliveryman === idDeliveryman
    );

    if (delivery) {
      delivery.end_at = new Date();
    }

    return { message: "Foi inicializado a entrega!" };
  }
}
