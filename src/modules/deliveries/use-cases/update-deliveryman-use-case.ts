interface UpdateDeliveryUseCaseRequest {
  idDelivery: string;
  idDeliveryman: string;
}

export class UpdateDeliveryUseCase {
  async execute({ idDelivery, idDeliveryman }: UpdateDeliveryUseCaseRequest) {}
}
