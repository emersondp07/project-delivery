import { hash } from "bcrypt";
import { prisma } from "../../../prisma/prisma";

interface CreateClientUseCaseRequest {
  username: string;
  password: string;
}

export class CreateClientUseCase {
  async execute({ username, password }: CreateClientUseCaseRequest) {
    const clientExist = await prisma.client.findFirst({
      where: {
        username: {
          mode: "insensitive",
        },
      },
    });

    if (clientExist) {
      throw new Error("Client already exists.");
    }

    const hashPassword = await hash(password, 10);

    const client = await prisma.client.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    return client;
  }
}
