import { Role } from '@prisma/client';
import { ICustomerRequestInterface } from './ICustomerRequestInterface';
import { ITimeslotRequestInterface } from './ITimeslotRequestInterface';

export interface IUserRequestInterface {
  username: string;
  email: string;
  password: string;
  role: Role;
  customer: ICustomerRequestInterface;
}
