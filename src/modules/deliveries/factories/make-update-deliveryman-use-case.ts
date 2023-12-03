import { PrismaDeliveriesRepository } from "../repositories/prisma-deliveries-repository";
import { UpdateDeliveryUseCase } from "../use-cases/update-deliveryman-use-case";

export function makeUpdateDeliverymanUseCase() {
  const deliveriesRepository = new PrismaDeliveriesRepository();
  const updateDeliveryUseCase = new UpdateDeliveryUseCase(deliveriesRepository);

  return updateDeliveryUseCase;
}
