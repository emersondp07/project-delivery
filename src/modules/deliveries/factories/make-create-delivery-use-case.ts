import { PrismaDeliveriesRepository } from "../repositories/prisma-deliveries-repository";
import { CreateDeliveryUseCase } from "../use-cases/create-delivery-use-case";

export function makeCreateDeliveryUseCase() {
  const deliveriesRepository = new PrismaDeliveriesRepository();
  const createDeliveryUseCase = new CreateDeliveryUseCase(deliveriesRepository);

  return createDeliveryUseCase;
}
