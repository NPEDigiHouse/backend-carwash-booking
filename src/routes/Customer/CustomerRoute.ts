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
      this.customerController.getAllCustomer,
    );
  }

  getCustomerRoute() {
    return this.route.get(
      '/:id',
      authToken,
      this.customerController.getCustomerDetail,
    );
  }

  deleteCustomerRoute() {
    return this.route.delete(
      '/:customerId',
      authToken,
      checkAdminAccees,
      this.customerController.deleteCustomer,
    );
  }

  registerRoute(): Router {
    this.getAllCustomersRoute();
    this.getCustomerRoute();
    this.deleteCustomerRoute();

    return this.route;
  }

  getRouter() {
    return this.route;
  }
}

export default CustomerRoute;
