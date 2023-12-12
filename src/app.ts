import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { routesClient } from "./modules/clients/controllers/routes";
import { routesDeliveryman } from "./modules/deliveryman/controllers/routes";

export const app = express();

app.use(express.json());

app.use(routesDeliveryman);
app.use(routesClient);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal server error.",
    });
  }
);
