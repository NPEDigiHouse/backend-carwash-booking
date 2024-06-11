import { NextFunction, Request, Response } from 'express';
import { AuthRepository } from '../../repository/Auth/AuthRepository';
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
      const user = await AuthRepository.register({
        email: payload.email,
        password: payload.password,
        username: payload.username,
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

    try {
      const user = await AuthRepository.login({
        email: payload.email,
        password: payload.password,
      });

      return res.json({
        message: 'Login berhasil',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async credentials(req: Request, res: Response, next: NextFunction) {
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
