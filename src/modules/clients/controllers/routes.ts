import { Router } from "express";
import { ensureAuthenticateClient } from "../../../middlewares/ensure-authenticate-client";
import { AuthenticateClientController } from "./authenticate-client-controller";
import { CreateClientController } from "./create-client-controller";
import { FindAllDeliveriesController } from "./find-all-deliveries-controller";

const routesClient = Router();

const authenticateClientController = new AuthenticateClientController();
const createClientController = new CreateClientController();
const findAllDeliveriesController = new FindAllDeliveriesController();

routesClient.post("/client/authenticate", authenticateClientController.handle);

routesClient.post("/client", createClientController.handle);

routesClient.get(
  "/client/deliveries",
  ensureAuthenticateClient,
  findAllDeliveriesController.handle
);

export { routesClient };
