import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayloadRequest {
  sub: string;
}

export async function ensureAuthenticateDeliveryman(
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
      "82a10c5f49bbc7f604d4f413777edeff"
    ) as PayloadRequest;

    request.idDeliveryman = sub;

    return next();
  } catch (error) {
    return response.status(401).json({
      message: "Invalid token.",
    });
  }
}