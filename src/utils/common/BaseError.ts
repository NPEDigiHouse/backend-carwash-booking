import { response } from 'express';

class BaseError {
  message: string;
  statusCode: number;

  constructor(message: string, statusCode: number) {
    this.message = message;
    this.statusCode = statusCode;
  }

  ErrorResponse() {
    return response.status(this.statusCode).json({
      message: this.message,
    });
  }
}

export default BaseError;
