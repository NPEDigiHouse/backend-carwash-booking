import { NextFunction, Request, Response } from 'express';
import { IUserRequestInterface } from '../../core/interfaces/request/IUserRequestInterface';
import AuthServices from '../../service/Auth/AuthService';
import UserServices from '../../service/User/UserService';

class AuthController {
  service: AuthServices;
  userService: UserServices;

  constructor(service: AuthServices, userService: UserServices) {
    this.service = service;
    this.userService = userService;
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.credentials = this.credentials.bind(this);
  }

  async register(req: Request, res: Response, next: NextFunction) {
    const payload: IUserRequestInterface = req.body;

    try {
      const user = await this.service.register({
        email: payload.email,
        password: payload.password,
        username: payload.username,
        customer: {
          name: payload.customer.name,
          phoneNumber: payload.customer.phoneNumber,
        },
      });

      return res.json({
        message: 'Berhasil menampilkan data user',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const payload: IUserRequestInterface = req.body;
    console.log('payload : ', payload);

    try {
      const user = await this.service.login({
        email: payload.email,
        password: payload.password,
      });

      console.log('user : ', user);

      return res.json({
        message: 'Login berhasil',
        data: user,
      });
    } catch (error: any) {
      console.log('error message : ', error.stack);

      next(error);
    }
  }

  async credentials(req: Request, res: Response, next: NextFunction) {
    console.log('user : ', req.signedCookies);

    try {
      const userCredential = req.signedCookies;
      const userDetail = await this.userService.getUserDetail(
        userCredential.id,
      );

      return res.json({
        message: 'Berhasil menampilkan user credential',
        data: userDetail,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
