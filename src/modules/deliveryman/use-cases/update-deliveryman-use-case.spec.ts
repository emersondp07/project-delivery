import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryClientsRepository } from "../../clients/repositories/in-memory-client-repository";
import { InMemoryDeliverymanRepository } from "../repositories/in-memory-deliveryman-repository";
import { UpdateDeliveryUseCase } from "./update-deliveryman-use-case";

let clientRepository: InMemoryClientsRepository;
let deliverymanRepository: InMemoryDeliverymanRepository;
let sut: UpdateDeliveryUseCase;

describe("Update Deliveryman Use Case", () => {
  beforeEach(async () => {
    clientRepository = new InMemoryClientsRepository();
    deliverymanRepository = new InMemoryDeliverymanRepository(clientRepository);
    sut = new UpdateDeliveryUseCase(deliverymanRepository);
  });

  it("should be able to update status initial delivery in deliveryman", async () => {
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

    await sut.execute({
      idDelivery: delivery.id,
      idDeliveryman: deliveryman.id,
    });

    expect(delivery.id_deliveryman).toEqual(expect.any(String));
    expect(delivery.id_client).toEqual(client.id);
    expect(delivery.id_deliveryman).toEqual(deliveryman.id);
  });
});
