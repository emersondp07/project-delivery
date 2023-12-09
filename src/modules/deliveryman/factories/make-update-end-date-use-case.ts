import { PrismaDeliverymanRepository } from "../repositories/prisma-deliveryman-repository";
import { UpdateEndDateUseCase } from "../use-cases/update-end-date-use-case";

export function makeUpdateEndDateUseCase() {
  const deliverymanRepository = new PrismaDeliverymanRepository();
  const updateDeliveryUseCase = new UpdateEndDateUseCase(deliverymanRepository);

  return updateDeliveryUseCase;
}
