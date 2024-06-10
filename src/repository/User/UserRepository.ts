import prisma from '../../config/database';
import { PrismaDB } from '../../config/database/DBConfig';
import UserEntity from '../../core/entities/User/UserEntity';
import { IUserRepository } from './UserRepositoryAbs';

class UserRepositoryImp extends IUserRepository {
  //   async createUser(payload: IUserRequestInterface) {
  //     try {
  //       const user = await prisma.user.create({
  //         data: {
  //           email: payload.email,
  //           username: payload.username,
  //           password: payload.password,
  //         },
  //       });
  //     } catch (error) {
  //       throw error;
  //     }
  //   }

  async getAllUsers() {
    try {
      const users = await prisma.user.findMany();

      return users.map((user) => {
        return new UserEntity({
          id: user.id,
          email: user.email,
          password: user.password,
          role: user.role,
          username: user.username,
        });
      });
    } catch (error) {
      throw error;
    }
  }
}

export const UserRepository = new UserRepositoryImp();
