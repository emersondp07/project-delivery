import { ClientRepository } from "../repositories/client-repository";

export class FindAllDeliveriesUseCase {
  constructor(private clientRepository: ClientRepository) {}
  async execute(idClient: string) {
    const deliveries = await this.clientRepository.findManyByIdClient(idClient);

    return deliveries;
  }
}
