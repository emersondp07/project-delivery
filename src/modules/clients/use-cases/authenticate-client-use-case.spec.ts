import { hash } from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryClientsRepository } from "../repositories/in-memory-client-repository";
import { AuthenticateClientUseCase } from "./authenticate-client-use-case";

let clientsRepository: InMemoryClientsRepository;
let sut: AuthenticateClientUseCase;

// sistem under test
describe("Authenticate Use Case", () => {
  beforeEach(() => {
    clientsRepository = new InMemoryClientsRepository();
    sut = new AuthenticateClientUseCase(clientsRepository);
  });

  it("should be able to authenticate", async () => {
    await clientsRepository.createClient({
      username: "John Doe",
      password: await hash("123456", 10),
    });

    const deliveryman = await sut.execute({
      username: "John Doe",
      password: "123456",
    });

    expect(deliveryman.token).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong username", async () => {
    await expect(() =>
      sut.execute({
        username: "John",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await clientsRepository.createClient({
      username: "John Doe",
      password: await hash("123456", 10),
    });
    await expect(() =>
      sut.execute({
        username: "John Doe",
        password: "1234567",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
