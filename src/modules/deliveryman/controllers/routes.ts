import { ensureAuthenticateDeliveryman } from "@/middlewares/ensure-authenticate-deliveryman";
import { Router } from "express";
import { AuthenticateDeliverymanController } from "./authenticate-deliveryman-controller";
import { CreateDeliverymanController } from "./create-deliveryman-controller";
import { FindAllAvailableController } from "./find-all-available-controller";
import { FindAllDeliveriesDeliverymanController } from "./find-all-deliveries-deliveryman-controller";
import { UpdateDeliveryController } from "./update-deliveryman-controller";
import { UpdateEndDateController } from "./update-end-date-controller";

const routesDeliveryman = Router();

const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliveryController = new AuthenticateDeliverymanController();
const findAllDeliveriesDeliverymanController =
  new FindAllDeliveriesDeliverymanController();

const findAllAvailableController = new FindAllAvailableController();
const updateDeliveryController = new UpdateDeliveryController();
const updateEndDateController = new UpdateEndDateController();

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

routesDeliveryman.get(
  "/delivery/available",
  ensureAuthenticateDeliveryman,
  findAllAvailableController.handle
);

routesDeliveryman.patch(
  "/delivery/update-deliveryman/:id",
  ensureAuthenticateDeliveryman,
  updateDeliveryController.handle
);

routesDeliveryman.patch(
  "/delivery/update-end-date/:id",
  ensureAuthenticateDeliveryman,
  updateEndDateController.handle
);

export { routesDeliveryman };
