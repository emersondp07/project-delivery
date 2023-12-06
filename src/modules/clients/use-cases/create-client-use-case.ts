import { Client } from "@prisma/client";
import { hash } from "bcrypt";
import { ClientRepository } from "../repositories/client-repository";

interface CreateClientUseCaseRequest {
  username: string;
  password: string;
}
interface CreateClientUseCaseResponse {
  client: Client;
}

export class CreateClientUseCase {
  constructor(private clientRepository: ClientRepository) {}
  async execute({
    username,
    password,
  }: CreateClientUseCaseRequest): Promise<CreateClientUseCaseResponse> {
    const clientExist = await this.clientRepository.findByUsername(username);

    if (clientExist) {
      throw new Error("Client already exists.");
    }

    const hashPassword = await hash(password, 10);

    const client = await this.clientRepository.createClient({
      username,
      password: hashPassword,
    });

    return { client };
  }
}
