import { NextFunction, Request, Response, Router } from 'express';
import UserController from '../../controllers/User/UserController';
import { authToken, checkAdminAccees } from '../../middleware/AuthMiddleware';
import { routerConfig } from '../../config/routes/RoutesConfig';

class UserRoute {
  route: Router;
  userController: UserController;

  constructor(userController: UserController) {
    this.userController = userController;
    this.route = Router();
    this.registerRoute();
  }

  getAllUsersRoute() {
    return this.route.get(
      '/',
      authToken,
      checkAdminAccees,
      (req: Request, res: Response, next: NextFunction) =>
        this.userController.getAllUsers(req, res, next),
    );
  }

  createUserRoute() {
    return this.route.post(
      '/',
      authToken,
      checkAdminAccees,
      (req: Request, res: Response, next: NextFunction) =>
        this.userController.createUser(req, res, next),
    );
  }

  deleteUserRoute() {
    return this.route.delete(
      '/:userId',
      authToken,
      checkAdminAccees,
      (req: Request, res: Response, next: NextFunction) =>
        this.userController.deleteUser(req, res, next),
    );
  }

  updateUserRoute() {
    return this.route.delete(
      '/:userId',
      authToken,
      checkAdminAccees,
      (req: Request, res: Response, next: NextFunction) =>
        this.userController.updateUser(req, res, next),
    );
  }

  registerRoute(): Router {
    this.getAllUsersRoute();
    this.createUserRoute();
    this.deleteUserRoute();
    this.updateUserRoute();

    return this.route;
  }

  getRouter() {
    return this.route;
  }
}

export default UserRoute;
