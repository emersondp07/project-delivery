import { PrismaDeliverymanRepository } from "../repositories/prisma-deliveryman-repository";
import { CreateDeliverymanUseCase } from "../use-cases/create-deliveryman-use-case";

export function makeCreateUseCase() {
  const deliverymanRepository = new PrismaDeliverymanRepository();
  const createUseCase = new CreateDeliverymanUseCase(deliverymanRepository);

  return createUseCase;
}
