import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
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

    const response = await request(app)
      .post("/delivery")
      .set("Authorization", `Bearer ${token}`)
      .send({
        itemName: "Pudim",
      });

    expect(response.statusCode).toEqual(201);
  });
});
