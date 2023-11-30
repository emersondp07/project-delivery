import { ensureAuthenticateClient } from "../../../middlewares/ensure-authenticate-client";
import { CreateClientController } from "./create-client-controller";
import { FindAllDeliveriesController } from "./find-all-deliveries-controller";

const createClientController = new CreateClientController();
const findAllDeliveriesController = new FindAllDeliveriesController();

routes.post("/client", createClientController.handle);

routes.get(
  "/client/deliveries",
  ensureAuthenticateClient,
  findAllDeliveriesController.handle
);
