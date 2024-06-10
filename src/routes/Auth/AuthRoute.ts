import { Router, RouterOptions } from 'express';
import AuthController from '../../controllers/Auth/AuthController';
import { routerConfig } from '../../config/routes/RoutesConfig';

const AuthControllerInit = new AuthController();

class AuthRouter {
  router = routerConfig;

  loginRoute() {
    return this.router.post('/login', AuthControllerInit.login);
  }

  registerRoute() {
    return this.router.post('/register', AuthControllerInit.register);
  }

  getAllAuthRouter() {
    this.loginRoute();
    this.registerRoute();

    return this.router;
  }
}

export default AuthRouter;
