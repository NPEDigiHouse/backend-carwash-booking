import { Router, RouterOptions } from 'express';
import AuthController from '../../controllers/Auth/AuthController';
import { routerConfig } from '../../config/routes/RoutesConfig';
import { authToken } from '../../middleware/AuthMiddleware';

class AuthRouter {
  router: Router;
  authController: AuthController;

  constructor(authController: AuthController) {
    this.authController = authController;
    this.router = Router();
    this.register();
  }

  loginRoute() {
    return this.router.post('/login', this.authController.login);
  }

  registerRoute() {
    return this.router.post('/register', this.authController.register);
  }

  credential() {
    return this.router.get(
      '/credential',
      authToken,
      this.authController.credentials,
    );
  }

  register() {
    this.loginRoute();
    this.registerRoute();
    this.credential();

    return this.router;
  }

  getRouter() {
    return this.router;
  }
}

export default AuthRouter;
