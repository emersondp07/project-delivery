interface UpdateEndDateCaseRequest {
  idDelivery: string;
  idDeliveryman: string;
}

export class UpdateEndDateUseCase {
  async execute({ idDelivery, idDeliveryman }: UpdateEndDateCaseRequest) {}
}
