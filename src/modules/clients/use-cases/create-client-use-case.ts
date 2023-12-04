import { hash } from "bcrypt";
import { ClientRepository } from "../repositories/client-repository";

interface CreateClientUseCaseRequest {
  username: string;
  password: string;
}

export class CreateClientUseCase {
  constructor(private clientRepository: ClientRepository) {}
  async execute({ username, password }: CreateClientUseCaseRequest) {
    const clientExist = await this.clientRepository.findByUsername(username);

    if (clientExist) {
      throw new Error("Client already exists.");
    }

    const hashPassword = await hash(password, 10);

    const client = await this.clientRepository.create({
      username,
      password: hashPassword,
    });

    return client;
  }
}
