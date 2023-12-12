import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Deliveryman (e2e)", () => {
  let server: any;

  beforeAll(async () => {
    await app.init();
  });

  afterAll(async () => {
    await app;
  });

  it("should be able to create deliveryman", async () => {
    const response = await request(app).post("/deliveryman").send({
      username: "John Doe",
      password: "123456",
    });

    expect(response.statusCode).toEqual(201);
  });
});
