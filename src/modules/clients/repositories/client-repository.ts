import { Client, Delivery, Prisma } from "@prisma/client";

interface ClientDeliveryResponse {
  id: string;
  username: string;
  deliveries: Delivery[];
}

export interface ClientRepository {
  findByUsername(username: string): Promise<Client | null>;
  createClient(data: Prisma.ClientCreateInput): Promise<Client>;
  findManyByClient(idClient: string): Promise<ClientDeliveryResponse[]>;
}
