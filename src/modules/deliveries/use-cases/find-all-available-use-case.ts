import { prisma } from "../../../prisma/prisma";

export class FindAllAvailableUseCase {
  async execute() {
    const deliveries = await prisma.delivery.findMany({
      where: {
        end_at: null,
        id_deliveryman: null,
      },
    });

    return deliveries;
  }
}