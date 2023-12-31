import { PrismaDeliverymanRepository } from "../repositories/prisma-deliveryman-repository";
import { CreateDeliverymanUseCase } from "../use-cases/create-deliveryman-use-case";

export function makeCreateDeliverymanUseCase() {
  const deliverymanRepository = new PrismaDeliverymanRepository();
  const createDeliveverymanUseCase = new CreateDeliverymanUseCase(
    deliverymanRepository
  );

  return createDeliveverymanUseCase;
}
