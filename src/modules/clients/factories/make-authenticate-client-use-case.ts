import { PrismaClientRepository } from "../repositories/prisma-client-repository";
import { AuthenticateClientUseCase } from "../use-cases/authenticate-client-use-case";

export function makeAuthenticateClientUseCase() {
  const clientRepository = new PrismaClientRepository();
  const authenticateUserUseCase = new AuthenticateClientUseCase(
    clientRepository
  );

  return authenticateUserUseCase;
}
