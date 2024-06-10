import { NextFunction, Request, Response } from 'express';
import { AuthRepository } from '../../repository/Auth/AuthRepository';
import { UserRepository } from '../../repository/User/UserRepository';
import UserServices from '../../service/User/UserService';
import prisma from '../../config/database';

class UserController {
  services: UserServices;

  constructor(services: UserServices) {
    this.services = services;
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.services.getAllUsers();

      return res.json({
        message: 'Berhasil menampilkan data user',
        data: users,
      });
    } catch (error) {
      console.log('error : ', error);

      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body;
      const user = await this.services.createUser(payload);

      return res.json({
        message: 'Berhasil membuat user',
        data: user,
      });
    } catch (error) {
      console.log('error : ', error);

      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    console.log('user params : ', req.params);

    try {
      const { userId } = req.params;

      const user = await this.services.deleteUser(userId);

      return res.json({
        message: 'Berhasil menghapus user',
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const payload = req.body;

      const user = await this.services.updateUser(userId, payload);

      return res.json({
        message: 'Berhasil mengubah data user',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
