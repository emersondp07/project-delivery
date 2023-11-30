import { PrismaDeliverymanRepository } from "../repositories/prisma-deliveryman-repository";
import { FindAllDeliveriesDeliverymanUseCase } from "../use-cases/find-all-deliveries-deliveryman-use-case";

export function makeFindAllDeliveriesDeliverymanUseCase() {
  const deliverymanRepository = new PrismaDeliverymanRepository();
  const findAllDeliveriesDeliverymanUseCase =
    new FindAllDeliveriesDeliverymanUseCase(deliverymanRepository);

  return findAllDeliveriesDeliverymanUseCase;
}
