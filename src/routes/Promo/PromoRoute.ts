import { NextFunction, Request, Response, Router } from 'express';
import { authToken, checkAdminAccees } from '../../middleware/AuthMiddleware';
import { routerConfig } from '../../config/routes/RoutesConfig';
import PromoController from '../../controllers/Promo/PromoController';

class PromoRoute {
  route: Router;
  promoController: PromoController;

  constructor(promoController: PromoController) {
    this.promoController = promoController;
    this.route = Router();
    this.registerRoute();
  }

  getAllPromosRoute() {
    return this.route.get(
      '/',
      authToken,
      checkAdminAccees,
      (req: Request, res: Response, next: NextFunction) =>
        this.promoController.getAllPromo(req, res, next),
    );
  }

  createPromo() {
    return this.route.post(
      '/',
      authToken,
      checkAdminAccees,
      (req: Request, res: Response, next: NextFunction) =>
        this.promoController.createPromo(req, res, next),
    );
  }

  updatePromo() {
    return this.route.put(
      '/:PromoId',
      authToken,
      checkAdminAccees,
      (req: Request, res: Response, next: NextFunction) =>
        this.promoController.updatePromo(req, res, next),
    );
  }

  deletePromo() {
    return this.route.delete(
      '/:PromoId',
      authToken,
      checkAdminAccees,
      (req: Request, res: Response, next: NextFunction) =>
        this.promoController.deletePromo(req, res, next),
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

export default PromoRoute;
