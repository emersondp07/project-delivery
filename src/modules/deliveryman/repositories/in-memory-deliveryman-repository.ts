import { Delivery, Deliveryman, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { InMemoryClientsRepository } from "../../clients/repositories/in-memory-client-repository";
import { DeliverymanRepository } from "./deliveryman-repository";

interface DeliverymanDeliveryResponse {
  id: string;
  username: string;
  deliveries: Delivery[];
}

export class InMemoryDeliverymanRepository implements DeliverymanRepository {
  public items: Deliveryman[] = [];
  // public deliveries: Delivery[] = [];

  constructor(private inMemoryClientsRepository: InMemoryClientsRepository) {}

  async findByUsername(username: string) {
    const deliveryman = this.items.find((item) => item.username === username);

    if (!deliveryman) {
      return null;
    }

    return deliveryman;
  }

  async findManyByDeliverymanId(
    idDeliveryman: string
  ): Promise<DeliverymanDeliveryResponse | undefined> {
    const deliveryman = this.items.find((item) => item.id === idDeliveryman);
    if (deliveryman) {
      const deliveries = this.inMemoryClientsRepository.deliveries.filter(
        (delivery) => delivery.id_deliveryman === idDeliveryman
      );

      return { id: deliveryman.id, username: deliveryman.username, deliveries };
    }
  }

  async createDeliveveryman(data: Prisma.DeliverymanCreateInput) {
    const deliveryman = {
      id: randomUUID(),
      username: data.username,
      password: data.password,
    };

    this.items.push(deliveryman);

    return deliveryman;
  }

  async findMany() {
    const deliveries = this.inMemoryClientsRepository.deliveries.filter(
      (delivery) => delivery.end_at === null && delivery.id_deliveryman === null
    );

    return deliveries;
  }

  async updateInitialDelivery(idDelivery: string, idDeliveryman: string) {
    const delivery = this.inMemoryClientsRepository.deliveries.find(
      (delivery) => delivery.id === idDelivery
    );

    if (!delivery) {
      return { message: "Não existe essa entrega!" };
    }

    delivery.id_deliveryman = idDeliveryman;

    return { message: "Entrega aceita!" };
  }

  async updateFinisheDelivery(idDelivery: string, idDeliveryman: string) {
    const delivery = this.inMemoryClientsRepository.deliveries.find(
      (delivery) =>
        delivery.id === idDelivery && delivery.id_deliveryman === idDeliveryman
    );

    if (!delivery) {
      return { message: "Não existe essa entrega!" };
    }

    delivery.end_at = new Date();

    return { message: "Entrega finalizada!" };
  }
}
