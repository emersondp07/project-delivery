import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryClientsRepository } from "../repositories/in-memory-client-repository";
import { CreateDeliveryUseCase } from "./create-delivery-use-case";

let clientRepository: InMemoryClientsRepository;
let sut: CreateDeliveryUseCase;

describe("Create Delivery Use Case", () => {
  beforeEach(() => {
    clientRepository = new InMemoryClientsRepository();
    sut = new CreateDeliveryUseCase(clientRepository);
  });

  it("should be able to create delivery", async () => {
    const client = await clientRepository.createClient({
      username: "John Doe",
      password: "123456",
    });

    const { delivery } = await sut.execute({
      itemName: "Pudim",
      idClient: client.id,
    });

    expect(delivery.id).toEqual(expect.any(String));
  });

  it("should validate that the item is not empty", async () => {
    const client = await clientRepository.createClient({
      username: "John Doe",
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        itemName: "",
        idClient: client.id,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
