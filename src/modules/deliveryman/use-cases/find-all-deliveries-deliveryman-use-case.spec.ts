import { beforeEach, describe, it } from "vitest";
import { InMemoryDeliverymanRepository } from "../repositories/in-memory-deliveryman-repository";
import { FindAllDeliveriesDeliverymanUseCase } from "./find-all-deliveries-deliveryman-use-case";

let deliverymanRepository: InMemoryDeliverymanRepository;
let sut: FindAllDeliveriesDeliverymanUseCase;

describe("Search Gyms Use Case", () => {
  beforeEach(async () => {
    deliverymanRepository = new InMemoryDeliverymanRepository();
    sut = new FindAllDeliveriesDeliverymanUseCase(deliverymanRepository);
  });

  it.skip("should be able to search for deliveries from the deliveryman", async () => {
    const deliveryman = await deliverymanRepository.createDeliveveryman({
      username: "John Doe",
      password: "123456",
    });

    // await gymsRepository.create({
    //   title: "JavasScript Gym",
    //   description: null,
    //   phone: null,
    //   latitude: -27.2892852,
    //   longitude: -49.6401091,
    // });
    // await gymsRepository.create({
    //   title: "TypeScript Gym",
    //   description: null,
    //   phone: null,
    //   latitude: -27.2892852,
    //   longitude: -49.6401091,
    // });
    // const { gyms } = await sut.execute({
    //   query: "JavasScript Gym",
    //   page: 1,
    // });
    // expect(gyms).toHaveLength(1);
    // expect(gyms).toEqual([
    //   expect.objectContaining({ title: "JavasScript Gym" }),
    // ]);
  });
});
