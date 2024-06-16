import { Response } from 'express';

class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    this.ErrorResponse = this.ErrorResponse.bind(this);
  }

  ErrorResponse(res: Response) {
    return res.status(this.statusCode).json({
      statusCode: this.statusCode,
      success: 'FAILED',
      message: this.message,
    });
  }
}

export default CustomError;
