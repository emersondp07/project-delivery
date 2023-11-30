import { AuthenticateClientController } from "./authenticate-client-controller";
import { AuthenticateDeliverymanController } from "./authenticate-deliveryman-controller";

const authenticateClientController = new AuthenticateClientController();
const authenticateDeliveryController = new AuthenticateDeliverymanController();

routes.post("/client/authenticate", authenticateClientController.handle);
routes.post("/deliveryman/authenticate", authenticateDeliveryController.handle);
