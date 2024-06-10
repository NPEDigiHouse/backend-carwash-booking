import { Role } from '@prisma/client';

export interface IUserResponseInterface {
  id: string;
  username: string;
  email: string;
  password: string;
  role: Role;
}
