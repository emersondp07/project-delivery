import { ensureAuthenticateDeliveryman } from "@/middlewares/ensure-authenticate-deliveryman";
import { Router } from "express";
import { AuthenticateDeliverymanController } from "./authenticate-deliveryman-controller";
import { CreateDeliverymanController } from "./create-deliveryman-controller";
import { FindAllDeliveriesDeliverymanController } from "./find-all-deliveries-deliveryman-controller";

const routesDeliveryman = Router();

const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliveryController = new AuthenticateDeliverymanController();
const findAllDeliveriesDeliverymanController =
  new FindAllDeliveriesDeliverymanController();

routesDeliveryman.post(
  "/deliveryman/authenticate",
  authenticateDeliveryController.handle
);

routesDeliveryman.post("/deliveryman", createDeliverymanController.handle);

routesDeliveryman.get(
  "/deliveryman/deliveries",
  ensureAuthenticateDeliveryman,
  findAllDeliveriesDeliverymanController.handle
);

export { routesDeliveryman };
