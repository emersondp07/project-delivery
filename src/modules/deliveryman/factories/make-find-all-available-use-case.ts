import { PrismaDeliverymanRepository } from "../repositories/prisma-deliveryman-repository";
import { FindAllAvailableUseCase } from "../use-cases/find-all-available-use-case";

export function makeFindAllAvailableUseCase() {
  const deliverymanRepository = new PrismaDeliverymanRepository();
  const findAllAvailableUseCase = new FindAllAvailableUseCase(
    deliverymanRepository
  );

  return findAllAvailableUseCase;
}
