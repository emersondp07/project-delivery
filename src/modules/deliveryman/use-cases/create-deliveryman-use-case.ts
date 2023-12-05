import { Deliveryman } from "@prisma/client";
import { hash } from "bcrypt";
import { DeliverymanRepository } from "../repositories/deliveryman-repository";

interface CreateDeliverymanUseCaseRequest {
  username: string;
  password: string;
}

interface CreateDeliverymanUseCaseResponse {
  deliveryman: Deliveryman;
}

export class CreateDeliverymanUseCase {
  constructor(private deliverymanRepository: DeliverymanRepository) {}

  async execute({
    username,
    password,
  }: CreateDeliverymanUseCaseRequest): Promise<CreateDeliverymanUseCaseResponse> {
    const deliverymanExist = await this.deliverymanRepository.findByUsername(
      username
    );

    if (deliverymanExist) {
      throw new Error("Client already exists."); // Criar erros customizados
    }

    const hashPassword = await hash(password, 10);

    const deliveryman = await this.deliverymanRepository.createDeliveveryman({
      username,
      password: hashPassword,
    });

    return { deliveryman };
  }
}
