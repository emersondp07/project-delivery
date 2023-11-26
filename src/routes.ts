import { Router } from "express";
import { AuthenticateClientController } from "./modules/account/use-cases/authenticate-client-controller";
import { CreateClientController } from "./modules/clients/use-cases/create-client-controller";

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();

routes.post("/client", createClientController.handle);
routes.post("/authenticate", authenticateClientController.handle);

export { routes };
