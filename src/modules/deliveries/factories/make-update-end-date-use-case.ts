import { PrismaDeliveriesRepository } from "../repositories/prisma-deliveries-repository";
import { UpdateEndDateUseCase } from "../use-cases/update-end-date-use-case";

export function makeUpdateEndDateUseCase() {
  const deliveriesRepository = new PrismaDeliveriesRepository();
  const updateDeliveryUseCase = new UpdateEndDateUseCase(deliveriesRepository);

  return updateDeliveryUseCase;
}
