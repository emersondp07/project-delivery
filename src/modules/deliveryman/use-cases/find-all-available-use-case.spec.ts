import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryClientsRepository } from "../../clients/repositories/in-memory-client-repository";
import { InMemoryDeliverymanRepository } from "../repositories/in-memory-deliveryman-repository";
import { FindAllAvailableUseCase } from "./find-all-available-use-case";

let clientRepository: InMemoryClientsRepository;
let deliverymanRepository: InMemoryDeliverymanRepository;
let sut: FindAllAvailableUseCase;

describe("Find All Available Use Case", () => {
  beforeEach(async () => {
    clientRepository = new InMemoryClientsRepository();
    deliverymanRepository = new InMemoryDeliverymanRepository(clientRepository);
    sut = new FindAllAvailableUseCase(deliverymanRepository);
  });

  it("should be able to find all availabe deliveries", async () => {
    const client = await clientRepository.createClient({
      username: "John Doe",
      password: "123456",
    });

    let idClient;
    let itemName;

    await clientRepository.createOneDelivery(
      (itemName = "Pudim"),
      (idClient = client.id)
    );

    await clientRepository.createOneDelivery(
      (itemName = "HotDog"),
      (idClient = client.id)
    );

    const deliveries = await sut.execute();

    expect(deliveries).toHaveLength(2);
    expect(deliveries).toEqual([
      expect.objectContaining({ item_name: "Pudim" }),
      expect.objectContaining({ item_name: "HotDog" }),
    ]);
  });
});
