import { app } from "@/app";
import { hash } from "bcrypt";
import request from "supertest";
import { prisma } from "../../prisma/prisma";

export async function createAndAuthenticateClient() {
  const user = await prisma.client.create({
    data: {
      username: "johnDoe",
      password: await hash("123456", 10),
    },
  });

  const authResponse = await request(app).post("/client/authenticate").send({
    email: "johnDoe",
    password: "123456",
  });

  const { token } = authResponse.body;

  return { token };
}
