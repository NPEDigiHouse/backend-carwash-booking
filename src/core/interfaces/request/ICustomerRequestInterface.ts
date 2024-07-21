import { Role } from '@prisma/client';

export interface ICustomerRequestInterface {
  name: string;
  phoneNumber: string;
  profilePicture?: string;
}

export interface ICustomerUserRecordRequestInterface {
  customer: ICustomerRequestInterface;
  username: string;
  email: string;
  id: string;
}
