import { ensureAuthenticateClient } from "../../../middlewares/ensure-authenticate-client";
import { ensureAuthenticateDeliveryman } from "../../../middlewares/ensure-authenticate-deliveryman";
import { CreateDeliveryController } from "./create-delivery-controller";
import { FindAllAvailableController } from "./find-all-available-controller";
import { UpdateDeliveryController } from "./update-deliveryman-controller";
import { UpdateEndDateController } from "./update-end-date-controller";

const createDeliveryController = new CreateDeliveryController();
const findAllAvailableController = new FindAllAvailableController();
const updateDeliveryController = new UpdateDeliveryController();

const updateEndDateController = new UpdateEndDateController();

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

routes.patch(
  "/delivery/update-end-date/:id",
  ensureAuthenticateDeliveryman,
  updateEndDateController.handle
);
