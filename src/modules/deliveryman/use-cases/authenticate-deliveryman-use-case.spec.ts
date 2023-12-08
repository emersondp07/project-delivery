import { hash } from "bcrypt";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryDeliverymanRepository } from "../repositories/in-memory-deliveryman-repository";
import { AuthenticateDeliverymanUseCase } from "./authenticate-deliveryman-use-case";

let deliverymanRepository: InMemoryDeliverymanRepository;
let sut: AuthenticateDeliverymanUseCase;

// sistem under test
describe("Authenticate Use Case", () => {
  beforeEach(() => {
    deliverymanRepository = new InMemoryDeliverymanRepository();
    sut = new AuthenticateDeliverymanUseCase(deliverymanRepository);
  });

  it("should be able to authenticate", async () => {
    await deliverymanRepository.createDeliveveryman({
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
    await deliverymanRepository.createDeliveveryman({
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
