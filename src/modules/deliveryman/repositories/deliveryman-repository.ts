import { Delivery, Deliveryman, Prisma } from "@prisma/client";

interface DeliverymanDeliveryResponse {
  id: string;
  username: string;
  deliveries: Delivery[];
}

export interface DeliverymanRepository {
  findByUsername(username: string): Promise<Deliveryman | null>;
  findManyByDeliverymanId(
    idDeliveryman: string
  ): Promise<DeliverymanDeliveryResponse | any>;
  createDeliveveryman(
    data: Prisma.DeliverymanCreateInput
  ): Promise<Deliveryman>;

  findMany(): Promise<Delivery[]>;

  updateInitialDelivery(
    idDelivery: string,
    idDeliveryman: string
  ): Promise<{ message: string }>;
  updateFinisheDelivery(
    idDelivery: string,
    idDeliveryman: string
  ): Promise<{ message: string }>;
}
