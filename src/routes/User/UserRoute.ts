import { NextFunction, Request, Response, Router } from 'express';
import UserController from '../../controllers/User/UserController';
import { authToken, checkAdminAccees } from '../../middleware/AuthMiddleware';
import { routerConfig } from '../../config/routes/RoutesConfig';
import { upload } from '../../middleware/MulterMiddleware';

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

      this.userController.getAllUsers,
    );
  }

  createUserRoute() {
    return this.route.post(
      '/',
      authToken,
      checkAdminAccees,
      this.userController.createUser,
    );
  }

  deleteUserRoute() {
    return this.route.delete(
      '/:userId',
      authToken,
      checkAdminAccees,
      this.userController.deleteUser,
    );
  }

  updateUserRoute() {
    return this.route.delete(
      '/:userId',
      authToken,
      checkAdminAccees,
      this.userController.updateUser,
    );
  }

  changeProfilePictureRoute() {
    return this.route.put(
      '/profile-picture/:userId',
      authToken,
      upload('profile').single('profilePicture'),
      this.userController.changeProfilePicture,
    );
  }

  getUserProfilePictureRoute() {
    return this.route.get(
      '/profile-picture/:userId',
      authToken,
      this.userController.getUserProfilePicture,
    );
  }

  registerRoute(): Router {
    this.getAllUsersRoute();
    this.createUserRoute();
    this.deleteUserRoute();
    this.updateUserRoute();
    this.changeProfilePictureRoute();
    this.getUserProfilePictureRoute();

    return this.route;
  }

  getRouter() {
    return this.route;
  }
}

export default UserRoute;
