import { NextFunction, Request, Response, Router } from 'express';
import { authToken, checkAdminAccees } from '../../middleware/AuthMiddleware';
import { routerConfig } from '../../config/routes/RoutesConfig';
import ProductController from '../../controllers/Product/ProductController';

class PublicRoute {
  route: Router;
  productController: ProductController;

  constructor(productController: ProductController) {
    this.productController = productController;
    this.route = Router();
    this.registerRoute();
  }

  getAllProductRoute() {
    return this.route.get('/products', this.productController.getAllProduct);
  }

  registerRoute(): Router {
    this.getAllProductRoute();

    return this.route;
  }

  getRouter() {
    return this.route;
  }
}

export default PublicRoute;
