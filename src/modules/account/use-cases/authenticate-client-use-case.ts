import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../prisma/prisma";

interface AuthenticateClientUseCaseRequest {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: AuthenticateClientUseCaseRequest) {
    const client = await prisma.client.findFirst({
      where: {
        username,
      },
    });

    if (!client) {
      throw new Error("Username or password incorrect.");
    }

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error("Username or password incorrect.");
    }

    const token = sign({ username }, "82a10c5f49bbc7f604d4f413666edeff", {
      subject: client.id,
      expiresIn: "1d",
    });

    return token;
  }
}
