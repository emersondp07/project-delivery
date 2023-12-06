import { compare } from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryClientsRepository } from "../repositories/in-memory-client-repository";
import { CreateClientUseCase } from "./create-client-use-case";

let clientRepository: InMemoryClientsRepository;
let sut: CreateClientUseCase;

describe("Create Client Use Case", () => {
  beforeEach(() => {
    clientRepository = new InMemoryClientsRepository();
    sut = new CreateClientUseCase(clientRepository);
  });

  it("should be able to create client", async () => {
    const { client } = await sut.execute({
      username: "John Doe",
      password: "123456",
    });

    expect(client.id).toEqual(expect.any(String));
  });

  it("should hash client password upon registration", async () => {
    const { client } = await sut.execute({
      username: "John Doe",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare("123456", client.password);

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
