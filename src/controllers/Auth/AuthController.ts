import { NextFunction, Request, Response } from 'express';
import { AuthRepository } from '../../repository/Auth/AuthRepository';
import { IUserRequestInterface } from '../../core/interfaces/request/IUserRequestInterface';

class AuthController {
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
}

export default AuthController;
