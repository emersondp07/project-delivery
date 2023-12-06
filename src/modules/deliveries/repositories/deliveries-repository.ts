import { Client, Delivery } from "@prisma/client";

export interface DeliveriesRepository {
  findMany(): Promise<Delivery[]>;
  findUnique(idClient: string): Promise<Client | null>;
  create(itemName: string, idClient: string): Promise<Delivery>;
  update(
    idDelivery: string,
    idDeliveryman: string
  ): Promise<{ message: string }>;
  updateMany(
    idDelivery: string,
    idDeliveryman: string
  ): Promise<{ message: string }>;
}
