import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryClientsRepository } from "../repositories/in-memory-client-repository";
import { FindAllDeliveriesUseCase } from "./find-all-deliveries-use-case";

let clientRepository: InMemoryClientsRepository;
let sut: FindAllDeliveriesUseCase;

describe("Fetch User Check-in History Use Case", () => {
  beforeEach(async () => {
    clientRepository = new InMemoryClientsRepository();
    sut = new FindAllDeliveriesUseCase(clientRepository);
  });

  it("should be able to fetch check-in history", async () => {
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

    const deliveries = await sut.execute(client.id);

    expect(deliveries).toHaveLength(2);
    expect(deliveries).toEqual([
      expect.objectContaining({ item_name: "Pudim" }),
      expect.objectContaining({ item_name: "HotDog" }),
    ]);
  });
});
