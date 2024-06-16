import { Role } from '@prisma/client';

export interface ICustomerRequestInterface {
  name: string;
  phoneNumber: string;
  profilePicture?: string;

  // userId: string;
}
