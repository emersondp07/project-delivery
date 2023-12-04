import { PrismaDeliverymanRepository } from "../repositories/prisma-deliveryman-repository";
import { AuthenticateDeliverymanUseCase } from "../use-cases/authenticate-deliveryman-use-case";

export function makeAuthenticateDeliverymanUseCase() {
  const deliverymanRepository = new PrismaDeliverymanRepository();
  const createDeliveverymanUseCase = new AuthenticateDeliverymanUseCase(
    deliverymanRepository
  );

  return createDeliveverymanUseCase;
}
