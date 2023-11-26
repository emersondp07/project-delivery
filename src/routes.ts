import { Router } from "express";
import { CreateClientController } from "./modules/clients/use-cases/create-client-controller";

const routes = Router();

const createClientController = new CreateClientController();
routes.post("/client/", createClientController.handle);

export { routes };
