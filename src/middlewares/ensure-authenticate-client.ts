import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayloadRequest {
  sub: string;
}

export async function ensureAuthenticateClient(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      message: "Token missing.",
    });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(
      token,
      process.env.JWT_SECRET_CLIENT
        ? process.env.JWT_SECRET_CLIENT
        : "unit-test"
    ) as PayloadRequest;

    request.idClient = sub;

    return next();
  } catch (error) {
    return response.status(401).json({
      message: "Invalid token.",
    });
  }
}
