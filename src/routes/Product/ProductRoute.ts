import { NextFunction, Request, Response, Router } from 'express';
import { authToken, checkAdminAccees } from '../../middleware/AuthMiddleware';
import ProductController from '../../controllers/Product/ProductController';

class ProductRoute {
  route: Router;
  productController: ProductController;

  constructor(productController: ProductController) {
    this.productController = productController;
    this.route = Router();
    this.registerRoute();
  }

  getAllPromosRoute() {
    return this.route.get(
      '/',
      authToken,
      checkAdminAccees,
      this.productController.getAllProduct,
    );
  }

  createPromo() {
    return this.route.post(
      '/',
      authToken,
      checkAdminAccees,
      this.productController.createProduct,
    );
  }

  updatePromo() {
    return this.route.put(
      '/:PromoId',
      authToken,
      checkAdminAccees,
      this.productController.updateProduct,
    );
  }

  deletePromo() {
    return this.route.delete(
      '/:PromoId',
      authToken,
      checkAdminAccees,
      this.productController.deleteProduct,
    );
  }

  registerRoute(): Router {
    this.getAllPromosRoute();
    this.createPromo();
    this.deletePromo();
    this.updatePromo();

    return this.route;
  }

  getRouter() {
    return this.route;
  }
}

export default ProductRoute;
