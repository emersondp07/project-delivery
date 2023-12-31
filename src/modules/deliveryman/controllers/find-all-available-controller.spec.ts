import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { prisma } from "../../../prisma/prisma";
import { createAndAuthenticateDeliveryman } from "../../../utils/test/create-authenticate-deliveryman";
import { createAndAuthenticateClient } from "../../../utils/test/create-authenticate-user";

describe("Find All Available (e2e)", () => {
  let server: any;

  beforeAll(async () => {
    server = await app.listen();
  });

  afterAll(async () => {
    await server.close();
  });

  it("should be able to find all available", async () => {
    const { token } = await createAndAuthenticateDeliveryman();

    await createAndAuthenticateClient();

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
      .get("/delivery/available")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual([
      expect.objectContaining({
        item_name: "Pudim",
        id_deliveryman: null,
        end_at: null,
      }),
      expect.objectContaining({
        item_name: "Cachorro quente",
        id_deliveryman: null,
        end_at: null,
      }),
    ]);
  });
});
