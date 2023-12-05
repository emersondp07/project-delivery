import { compare } from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryDeliverymanRepository } from "../repositories/in-memory-deliveryman-repository";
import { CreateDeliverymanUseCase } from "./create-deliveryman-use-case";

let deliverymanRepository: InMemoryDeliverymanRepository;
let sut: CreateDeliverymanUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    deliverymanRepository = new InMemoryDeliverymanRepository();
    sut = new CreateDeliverymanUseCase(deliverymanRepository);
  });

  it("should be able to create deliveryman", async () => {
    const { deliveryman } = await sut.execute({
      username: "John Doe",
      password: "123456",
    });

    expect(deliveryman.id).toEqual(expect.any(String));
  });

  it("should hash deliveryman password upon registration", async () => {
    const { deliveryman } = await sut.execute({
      username: "John Doe",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      deliveryman.password
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to create deliveryman with same username twice", async () => {
    await sut.execute({
      username: "John Doe",
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        username: "John Doe",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(Error); // Criar erro especifico
  });
});
