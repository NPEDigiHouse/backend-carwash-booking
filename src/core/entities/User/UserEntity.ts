import { Role } from '@prisma/client';
import { IUserResponseInterface } from '../../interfaces/response/IUserResponseInterface';

class UserEntity {
  id: string;
  email: string;
  password: string;
  username: string;
  role: Role;

  constructor({ id, email, password, username, role }: IUserResponseInterface) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.username = username;
    this.role = role;
  }
}

export default UserEntity;
