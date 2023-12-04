import { PrismaClientRepository } from "../repositories/prisma-client-repository";
import { CreateClientUseCase } from "../use-cases/create-client-use-case";

export function makeCreateClientUseCase() {
  const clientRepository = new PrismaClientRepository();
  const createUserUseCase = new CreateClientUseCase(clientRepository);

  return createUserUseCase;
}
