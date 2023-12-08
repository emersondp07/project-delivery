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
  ): Promise<DeliverymanDeliveryResponse>;
  createDeliveveryman(
    data: Prisma.DeliverymanCreateInput
  ): Promise<Deliveryman>;
}
