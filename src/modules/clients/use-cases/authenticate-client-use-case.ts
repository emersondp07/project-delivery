import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { ClientRepository } from "../repositories/client-repository";

interface AuthenticateClientUseCaseRequest {
  username: string;
  password: string;
}

interface AuthenticateClientUseCaseResponse {
  token: string;
}

export class AuthenticateClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute({
    username,
    password,
  }: AuthenticateClientUseCaseRequest): Promise<AuthenticateClientUseCaseResponse> {
    const client = await this.clientRepository.findByUsername(username);

    if (!client) {
      throw new Error("Username or password incorrect.");
    }

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error("Username or password incorrect.");
    }

    const token = sign(
      { username },
      process.env.JWT_SECRET_CLIENT || "unit-test",
      {
        subject: client.id,
        expiresIn: "1d",
      }
    );

    return { token };
  }
}
