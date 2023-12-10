import { Delivery } from "@prisma/client";
import { DeliverymanRepository } from "../repositories/deliveryman-repository";

interface DeliverymanDeliveryResponse {
  id: string;
  username: string;
  deliveries: Delivery[];
}

export class FindAllDeliveriesDeliverymanUseCase {
  constructor(private deliverymanRepository: DeliverymanRepository) {}

  async execute(idDeliveryman: string): Promise<DeliverymanDeliveryResponse> {
    const deliveries =
      this.deliverymanRepository.findManyByDeliverymanId(idDeliveryman);

    return deliveries;
  }
}
