import { Client, Delivery, Prisma } from "@prisma/client";

interface ClientDeliveryResponse {
  id: string;
  username: string;
  deliveries: Delivery[];
}

export interface ClientRepository {
  findByUsername(username: string): Promise<Client | null>;
  create(data: Prisma.ClientCreateInput): Promise<Client>;
  findMany(idClient: string): Promise<ClientDeliveryResponse[]>;
}
