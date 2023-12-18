import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("authenticate Deliveryman (e2e)", () => {
  let server: any;

  beforeAll(async () => {
    server = await app.listen();
  });

  afterAll(async () => {
    await server.close();
  });

  it("should be able to authenticate", async () => {
    await request(app).post("/deliveryman").send({
      username: "John Doe",
      password: "123456",
    });

    const response = await request(app).post("/deliveryman/authenticate").send({
      username: "John Doe",
      password: "123456",
    });

    expect(response.statusCode).toEqual(200);
  });
});
