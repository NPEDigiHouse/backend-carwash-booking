import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
// import cookie from 'cookie-parser';

const authToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      //   throw new UnauthorizedError('Token tidak ada');
    }

    const userToken = jwt.verify(token!, process.env.JWT_KEY as string);

    if (!userToken) {
      //   throw new UnauthorizedError('Token tidak terverifikasi');
    }

    req.signedCookies = userToken as any;

    // req.body.user = userToken;

    next();
  } catch (error) {
    console.log(error);

    next(error);
  }
};

const checkAdminAccees = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { role } = req.signedCookies;

    if (role.toLowerCase() !== 'admin'.toLowerCase()) {
      throw new Error('Hanya Admin yang bisa mengakses endpoint ini');
    }

    next();
  } catch (error) {
    console.log('error : ', error);

    next(error);
  }
};

export { checkAdminAccees, authToken };
