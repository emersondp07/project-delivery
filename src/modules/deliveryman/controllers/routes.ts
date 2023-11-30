import { Router } from "express";
import { ensureAuthenticateDeliveryman } from "../../../middlewares/ensure-authenticate-deliveryman";
import { CreateDeliverymanController } from "./create-deliveryman-controller";
import { FindAllDeliveriesDeliverymanController } from "./find-all-deliveries-deliveryman-controller";

const routes = Router();

const createDeliverymanController = new CreateDeliverymanController();

const findAllDeliveriesDeliverymanController =
  new FindAllDeliveriesDeliverymanController();

routes.post("/deliveryman", createDeliverymanController.handle);

routes.get(
  "/deliveryman/deliveries",
  ensureAuthenticateDeliveryman,
  findAllDeliveriesDeliverymanController.handle
);

export { routes };
