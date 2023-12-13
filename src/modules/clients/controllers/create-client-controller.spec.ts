import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Client (e2e)", () => {
  let server: any;

  beforeAll(async () => {
    server = app.listen();
  });

  afterAll(async () => {
    // process.exit();
    server.close();
  });

  it("should be able to create client", async () => {
    const response = await request(app).post("/client").send({
      username: "John J",
      password: "123456",
    });

    expect(response.statusCode).toEqual(201);
  });
});
