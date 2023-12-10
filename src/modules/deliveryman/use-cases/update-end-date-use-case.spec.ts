import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryClientsRepository } from "../../clients/repositories/in-memory-client-repository";
import { InMemoryDeliverymanRepository } from "../repositories/in-memory-deliveryman-repository";
import { UpdateEndDateUseCase } from "./update-end-date-use-case";

let clientRepository: InMemoryClientsRepository;
let deliverymanRepository: InMemoryDeliverymanRepository;
let sut: UpdateEndDateUseCase;

describe("Update End Date Use Case", () => {
  beforeEach(async () => {
    clientRepository = new InMemoryClientsRepository();
    deliverymanRepository = new InMemoryDeliverymanRepository(clientRepository);
    sut = new UpdateEndDateUseCase(deliverymanRepository);
  });

  it("should be able to update status finish delivery in deliveryman", async () => {
    const client = await clientRepository.createClient({
      username: "John Doe",
      password: "123456",
    });

    const deliveryman = await deliverymanRepository.createDeliveveryman({
      username: "Emerson Dantas",
      password: "123456",
    });

    let idClient;
    let itemName;

    const delivery = await clientRepository.createOneDelivery(
      (itemName = "Pudim"),
      (idClient = client.id)
    );

    let idDelivery;
    let idDeliveryman;

    await deliverymanRepository.updateInitialDelivery(
      (idDelivery = delivery.id),
      (idDeliveryman = deliveryman.id)
    );

    await sut.execute({
      idDelivery: delivery.id,
      idDeliveryman: deliveryman.id,
    });

    expect(delivery.end_at).toEqual(expect.any(Date));
    expect(delivery.id_client).toEqual(client.id);
    expect(delivery.id_deliveryman).toEqual(deliveryman.id);
  });
});
