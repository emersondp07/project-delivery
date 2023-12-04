import { PrismaClientRepository } from "../repositories/prisma-client-repository";
import { FindAllDeliveriesUseCase } from "../use-cases/find-all-deliveries-use-case";

export function makeFindAllDeliveriesDeliverymanUseCase() {
  const clientRepository = new PrismaClientRepository();
  const findAllDeliveriesUseCase = new FindAllDeliveriesUseCase(
    clientRepository
  );

  return findAllDeliveriesUseCase;
}
