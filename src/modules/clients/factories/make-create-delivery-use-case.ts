import { PrismaClientRepository } from "../repositories/prisma-client-repository";
import { CreateDeliveryUseCase } from "../use-cases/create-delivery-use-case";

export function makeCreateDeliveryUseCase() {
  const clientRepository = new PrismaClientRepository();
  const createDeliveryUseCase = new CreateDeliveryUseCase(clientRepository);

  return createDeliveryUseCase;
}
