import UserEntity from '../../core/entities/User/UserEntity';

export abstract class IUserRepository {
  abstract getAllUsers(): Promise<UserEntity[]>;
}
