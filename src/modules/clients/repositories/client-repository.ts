import { Client, Delivery, Prisma } from "@prisma/client";

interface ClientDeliveryResponse {
  id: string;
  username: string;
  deliveries: Delivery[];
}

export interface ClientRepository {
  findByUsername(username: string): Promise<Client | null>;
  createClient(data: Prisma.ClientCreateInput): Promise<Client>;
  findManyByIdClient(idClient: string): Promise<ClientDeliveryResponse[]>;
  findUnique(idClient: string): Promise<Client | null>;
  createOneDelivery(itemName: string, idClient: string): Promise<Delivery>;
}
