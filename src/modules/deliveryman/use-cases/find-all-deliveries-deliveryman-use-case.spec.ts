import { beforeEach, describe, it } from "vitest";
import { InMemoryClientsRepository } from "../../clients/repositories/in-memory-client-repository";
import { InMemoryDeliveriesRepository } from "../../deliveries/repositories/in-memory-deliveries-repository";
import { InMemoryDeliverymanRepository } from "../repositories/in-memory-deliveryman-repository";
import { FindAllDeliveriesDeliverymanUseCase } from "./find-all-deliveries-deliveryman-use-case";

let deliverymanRepository: InMemoryDeliverymanRepository;
let deliveriesRepository: InMemoryDeliveriesRepository;
let clientRepository: InMemoryClientsRepository;
let sut: FindAllDeliveriesDeliverymanUseCase;

describe("Find All Deliveries Use Case", () => {
  beforeEach(async () => {
    deliverymanRepository = new InMemoryDeliverymanRepository();
    deliveriesRepository = new InMemoryDeliveriesRepository();
    clientRepository = new InMemoryClientsRepository();
    sut = new FindAllDeliveriesDeliverymanUseCase(deliverymanRepository);
  });

  it.skip("should be able to search for deliveries from the deliveryman", async () => {
    const deliveryman = await deliverymanRepository.createDeliveveryman({
      username: "John Doe",
      password: "123456",
    });

    const client = await clientRepository.createClient({
      username: "Emerson Dantas",
      password: "123456",
    });

    const delivery1 = await deliveriesRepository.create("pudim", client.id);
    const delivery2 = await deliveriesRepository.create("arroz", client.id);

    const d = await deliveriesRepository.update(delivery1.id, deliveryman.id);
    const c = await deliveriesRepository.update(delivery2.id, deliveryman.id);

    const deliveries = await sut.execute(deliveryman.id);

    // expect(gyms).toHaveLength(1);
    // expect(gyms).toEqual([
    //   expect.objectContaining({ title: "JavasScript Gym" }),
    // ]);
  });
});
