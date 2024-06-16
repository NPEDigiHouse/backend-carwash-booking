import { NextFunction, Request, Response } from 'express';
import CustomError from '../utils/common/CustomError';

export const ErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('error middleware : ', err);

  if (err instanceof CustomError) {
    return err.ErrorResponse(res);
  }

  return res.status(500).json({
    statusCode: 500,
    status: 'FAILED',
    message: 'Internal Server Error',
  });
};
