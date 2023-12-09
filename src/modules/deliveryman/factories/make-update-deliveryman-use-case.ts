import { PrismaDeliverymanRepository } from "../repositories/prisma-deliveryman-repository";
import { UpdateDeliveryUseCase } from "../use-cases/update-deliveryman-use-case";

export function makeUpdateDeliverymanUseCase() {
  const deliverymanRepository = new PrismaDeliverymanRepository();
  const updateDeliveryUseCase = new UpdateDeliveryUseCase(
    deliverymanRepository
  );

  return updateDeliveryUseCase;
}
