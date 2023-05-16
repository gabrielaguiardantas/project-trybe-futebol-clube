import { compare } from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { Json } from '../interfaces/json.interface';
import { User } from '../interfaces/user.interface';

export default class UserService {
  public static async findByLogin(email: string, password: string):
  Promise<{ user?: User | null, json?: Json }> {
    const user = await UserService.findByEmail(email);
    if (user) {
      const validLogin = await UserService.checkPassword(password, user.password as string);
      if (validLogin) {
        const newValidUser = { ...user };
        delete newValidUser.password;
        return { user: newValidUser };
      }
    }
    return { json: { message: 'Invalid email or password' } };
  }

  static async checkPassword(password: string, hash: string): Promise<boolean> {
    const isValidPassword = await compare(password, hash);
    return isValidPassword;
  }

  static async findByEmail(email: string): Promise<UserModel | null> {
    const user = await UserModel.findOne({
      where: {
        email,
      },
    });
    return user;
  }
}
