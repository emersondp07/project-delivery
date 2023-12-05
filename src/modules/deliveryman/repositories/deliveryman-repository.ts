import { Delivery, Deliveryman, Prisma } from "@prisma/client";

export interface DeliverymanRepository {
  findByUsername(username: string): Promise<Deliveryman | null>;
  findManyByDeliverymanId(idDeliveryman: string): Promise<Delivery[]>;
  createDeliveveryman(
    data: Prisma.DeliverymanCreateInput
  ): Promise<Deliveryman>;
}
