import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { prisma } from "../../../prisma/prisma";
import { createAndAuthenticateDeliveryman } from "../../../utils/test/create-authenticate-deliveryman";
import { createAndAuthenticateClient } from "../../../utils/test/create-authenticate-user";

describe("Update End of Delivery Check (e2e)", () => {
  let server: any;

  beforeAll(async () => {
    server = await app.listen();
  });

  afterAll(async () => {
    await server.close();
  });

  it("should be able to update end of delivery check", async () => {
    const { token } = await createAndAuthenticateDeliveryman();

    await createAndAuthenticateClient();

    const client = await prisma.client.findFirstOrThrow();

    const deliveryman = await prisma.deliveryman.findFirstOrThrow();

    const delivery = await prisma.delivery.create({
      data: {
        item_name: "Pudim",
        id_client: client.id,
      },
    });

    await prisma.delivery.update({
      where: {
        id: delivery.id,
      },
      data: {
        id_deliveryman: deliveryman.id,
      },
    });

    const response = await request(app)
      .patch(`/delivery/update-end-date/${delivery.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(204);
  });
});
