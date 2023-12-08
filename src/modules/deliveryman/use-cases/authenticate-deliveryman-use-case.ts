import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { DeliverymanRepository } from "../repositories/deliveryman-repository";

interface AuthenticateDeliverymanUseCaseRequest {
  username: string;
  password: string;
}

interface AuthenticateDeliverymanUseCaseResponse {
  token: string;
}

export class AuthenticateDeliverymanUseCase {
  constructor(private deliverymanRepository: DeliverymanRepository) {}

  async execute({
    username,
    password,
  }: AuthenticateDeliverymanUseCaseRequest): Promise<AuthenticateDeliverymanUseCaseResponse> {
    const deliveryman = await this.deliverymanRepository.findByUsername(
      username
    );

    if (!deliveryman) {
      throw new Error("Username or password incorrect.");
    }

    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new Error("Username or password incorrect.");
    }

    const token = sign(
      { username },
      process.env.JWT_SECRET_DELIVERYMAN || "unit-test",
      {
        subject: deliveryman.id,
        expiresIn: "1d",
      }
    );

    return { token };
  }
}
