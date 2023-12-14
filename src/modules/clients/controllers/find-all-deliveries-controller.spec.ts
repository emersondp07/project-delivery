import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { prisma } from "../../../prisma/prisma";
import { createAndAuthenticateClient } from "../../../utils/test/create-authenticate-user";

describe("Create Delivery (e2e)", () => {
  let server: any;

  beforeAll(async () => {
    server = app.listen();
  });

  afterAll(async () => {
    server.close();
  });

  it("should be able to create delivery", async () => {
    const { token } = await createAndAuthenticateClient();

    const client = await prisma.client.findFirstOrThrow();

    await prisma.delivery.createMany({
      data: [
        {
          item_name: "Pudim",
          id_client: client.id,
        },
        {
          item_name: "Cachorro quente",
          id_client: client.id,
        },
      ],
    });

    const response = await request(app)
      .get("/client/deliveries")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual([
      expect.objectContaining({
        id: client.id,
        username: client.username,
      }),
    ]);
  });
});
