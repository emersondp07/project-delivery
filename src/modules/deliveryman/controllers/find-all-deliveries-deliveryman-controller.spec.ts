import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { prisma } from "../../../prisma/prisma";
import { createAndAuthenticateDeliveryman } from "../../../utils/test/create-authenticate-deliveryman";
import { createAndAuthenticateClient } from "../../../utils/test/create-authenticate-user";

describe("Find All Deliveries for Deliveryman (e2e)", () => {
  let server: any;

  beforeAll(async () => {
    server = await app.listen();
  });

  afterAll(async () => {
    await server.close();
  });

  it("should be able to find all deliveries for deliveryman", async () => {
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
      .get(`/deliveryman/deliveries`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual([
      expect.objectContaining({
        id: deliveryman.id,
        username: deliveryman.username,
      }),
    ]);
  });
});
