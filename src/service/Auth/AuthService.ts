import prisma from '../../config/database';
import {
  IAuthLoginRequestType,
  IAuthRegisterRequestType,
} from '../../core/interfaces/auth/IAuthRequestInterface';
import CustomError from '../../utils/common/CustomError';
import { BcryptLibsUtil } from '../../utils/libs/BcryptLibs';
import { TokenLibsUtils } from '../../utils/libs/TokenLibs';

class AuthServices {
  async login(payload: IAuthLoginRequestType) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: payload.email,
        },
      });

      if (!user) {
        throw new CustomError('Email atau password salah', 401);
      }

      const checkPassword = await BcryptLibsUtil.compareBcrypt(
        payload.password,
        user?.password,
      );

      console.log('check password : ', checkPassword);

      if (!checkPassword) {
        throw new CustomError('Email atau password salah', 401);
      }

      const generateToken = TokenLibsUtils.signToken({
        payload: { id: user.id, role: user.role },
        secretKey: process.env.JWT_KEY as string,
      });

      return generateToken;
    } catch (error) {
      throw error;
    }
  }

  async register(payload: IAuthRegisterRequestType) {
    try {
      const hashPassword = await BcryptLibsUtil.hashBcrypt(payload.password);

      const user = await prisma.user.create({
        data: {
          email: payload.email,
          password: hashPassword,
          username: payload.username,
          customer: {
            create: {
              name: payload.customer.name,
              phoneNumber: payload.customer.phoneNumber,
            },
          },
        },
      });

      // const customer = await prisma.customer.create({
      //   data: {
      //     user: {
      //       connect: {
      //         id: user.id,
      //       },
      //     },
      //     name: payload.customer.name,
      //     phoneNumber: payload.customer.phoneNumber,
      //   },
      // });

      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthServices;
