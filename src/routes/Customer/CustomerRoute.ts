import { NextFunction, Request, Response, Router } from 'express';
import { authToken, checkAdminAccees } from '../../middleware/AuthMiddleware';
import CustomerController from '../../controllers/Customer/CustomerController';
import { routerConfig } from '../../config/routes/RoutesConfig';

class CustomerRoute {
  route: Router;
  customerController: CustomerController;

  constructor(customerController: CustomerController) {
    this.customerController = customerController;
    this.route = Router();
    this.registerRoute();
  }

  getAllCustomersRoute() {
    return this.route.get(
      '/',
      authToken,
      checkAdminAccees,
      (req: Request, res: Response, next: NextFunction) =>
        this.customerController.getAllCustomer(req, res, next),
    );
  }

  registerRoute(): Router {
    this.getAllCustomersRoute();

    return this.route;
  }

  getRouter() {
    return this.route;
  }
}

export default CustomerRoute;
