import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryClientsRepository } from "../../clients/repositories/in-memory-client-repository";
import { InMemoryDeliverymanRepository } from "../repositories/in-memory-deliveryman-repository";
import { FindAllDeliveriesDeliverymanUseCase } from "./find-all-deliveries-deliveryman-use-case";

let clientRepository: InMemoryClientsRepository;
let deliverymanRepository: InMemoryDeliverymanRepository;
let sut: FindAllDeliveriesDeliverymanUseCase;

describe("Find All Deliveries Deliveryman Use Case", () => {
  beforeEach(async () => {
    clientRepository = new InMemoryClientsRepository();
    deliverymanRepository = new InMemoryDeliverymanRepository(clientRepository);
    sut = new FindAllDeliveriesDeliverymanUseCase(deliverymanRepository);
  });

  it("should be able to find all deliveries for deliveryman", async () => {
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

    const delivery1 = await clientRepository.createOneDelivery(
      (itemName = "Pudim"),
      (idClient = client.id)
    );

    const delivery2 = await clientRepository.createOneDelivery(
      (itemName = "HotDog"),
      (idClient = client.id)
    );

    await deliverymanRepository.updateInitialDelivery(
      delivery1.id,
      deliveryman.id
    );

    await deliverymanRepository.updateInitialDelivery(
      delivery2.id,
      deliveryman.id
    );

    const deliverymanAndDeliveries = await sut.execute(deliveryman.id);

    expect(deliverymanAndDeliveries.deliveries).toHaveLength(2);
    expect(deliverymanAndDeliveries.deliveries).toEqual([
      expect.objectContaining({ id_client: expect.any(String) }),
      expect.objectContaining({ id_client: expect.any(String) }),
    ]);
    expect(deliverymanAndDeliveries.deliveries).toEqual([
      expect.objectContaining({ id_deliveryman: deliverymanAndDeliveries.id }),
      expect.objectContaining({ id_deliveryman: deliverymanAndDeliveries.id }),
    ]);
  });
});
