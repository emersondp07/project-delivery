import { prisma } from "../../../prisma/prisma";

interface UpdateEndDateCaseRequest {
  idDelivery: string;
  idDeliveryman: string;
}

export class UpdateEndDateUseCase {
  async execute({ idDelivery, idDeliveryman }: UpdateEndDateCaseRequest) {
    const result = await prisma.delivery.updateMany({
      where: {
        id: idDelivery,
        id_deliveryman: idDeliveryman,
      },
      data: {
        end_at: new Date(),
      },
    });

    return result;
  }
}
