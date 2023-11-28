import { Router } from "express";
import { ensureAuthenticateClient } from "./middlewares/ensure-authenticate-client";

import { ensureAuthenticateDeliveryman } from "./middlewares/ensure-authenticate-deliveryman";
import { AuthenticateClientController } from "./modules/account/controllers/authenticate-client-controller";
import { AuthenticateDeliverymanController } from "./modules/account/controllers/authenticate-deliveryman-controller";
import { CreateClientController } from "./modules/clients/controllers/create-client-controller";
import { FindAllDeliveriesController } from "./modules/clients/controllers/find-all-deliveries-controller";
import { CreateDeliveryController } from "./modules/deliveries/controllers/create-delivery-controller";
import { FindAllAvailableController } from "./modules/deliveries/controllers/find-all-available-controller";
import { UpdateDeliveryController } from "./modules/deliveries/controllers/update-deliveryman-controller";
import { UpdateEndDateController } from "./modules/deliveries/controllers/update-end-date-controller";
import { CreateDeliverymanController } from "./modules/deliveryman/controllers/create-deliveryman-controller";
import { FindAllDeliveriesDeliverymanController } from "./modules/deliveryman/controllers/find-all-deliveries-deliveryman-controller";

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliveryController = new AuthenticateDeliverymanController();
const createDeliveryController = new CreateDeliveryController();
const findAllAvailableController = new FindAllAvailableController();
const updateDeliveryController = new UpdateDeliveryController();
const findAllDeliveriesController = new FindAllDeliveriesController();
const findAllDeliveriesDeliverymanController =
  new FindAllDeliveriesDeliverymanController();
const updateEndDateController = new UpdateEndDateController();

routes.post("/client/authenticate", authenticateClientController.handle);
routes.post("/deliveryman/authenticate", authenticateDeliveryController.handle);

routes.post("/client", createClientController.handle);
routes.post("/deliveryman", createDeliverymanController.handle);

routes.post(
  "/delivery",
  ensureAuthenticateClient,
  createDeliveryController.handle
);
routes.get(
  "/delivery/available",
  ensureAuthenticateDeliveryman,
  findAllAvailableController.handle
);

routes.patch(
  "/delivery/update-deliveryman/:id",
  ensureAuthenticateDeliveryman,
  updateDeliveryController.handle
);

routes.get(
  "/client/deliveries",
  ensureAuthenticateClient,
  findAllDeliveriesController.handle
);

routes.get(
  "/deliveryman/deliveries",
  ensureAuthenticateDeliveryman,
  findAllDeliveriesDeliverymanController.handle
);

routes.patch(
  "/delivery/update-end-date/:id",
  ensureAuthenticateDeliveryman,
  updateEndDateController.handle
);

export { routes };
