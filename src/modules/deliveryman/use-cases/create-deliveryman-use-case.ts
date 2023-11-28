import { hash } from "bcrypt";
import { prisma } from "../../../prisma/prisma";

interface CreateDeliverymanUseCaseRequest {
  username: string;
  password: string;
}

export class CreateDeliverymanUseCase {
  async execute({ username, password }: CreateDeliverymanUseCaseRequest) {
    const deliverymanExist = await prisma.deliveryman.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });

    if (deliverymanExist) {
      throw new Error("Client already exists.");
    }

    const hashPassword = await hash(password, 10);

    const client = await prisma.deliveryman.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    return client;
  }
}
