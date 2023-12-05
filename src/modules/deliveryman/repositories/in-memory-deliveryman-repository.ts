import { Deliveryman, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { DeliverymanRepository } from "./deliveryman-repository";

export class InMemoryDeliverymanRepository implements DeliverymanRepository {
  public items: Deliveryman[] = [];

  async findByUsername(username: string) {
    const deliveryman = this.items.find((item) => item.username === username);

    if (!deliveryman) {
      return null;
    }

    return deliveryman;
  }

  async findManyByDeliverymanId(idDeliveryman: string): Promise<any> {
    const deliveryman = this.items.filter((item) => item.id === idDeliveryman);

    return deliveryman;
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
}
