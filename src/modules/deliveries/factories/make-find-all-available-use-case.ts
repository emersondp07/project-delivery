import { PrismaDeliveriesRepository } from "../repositories/prisma-deliveries-repository";
import { FindAllAvailableUseCase } from "../use-cases/find-all-available-use-case";

export function makeFindAllAvailableUseCase() {
  const deliveriesRepository = new PrismaDeliveriesRepository();
  const findAllAvailableUseCase = new FindAllAvailableUseCase(
    deliveriesRepository
  );

  return findAllAvailableUseCase;
}
