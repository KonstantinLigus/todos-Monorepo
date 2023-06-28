import { ICreateUserReq, IOptionalUser } from '../types/todos.type';
import { User } from '../entities/User';
import dataSource from '../config/datasourse';

export default class UserService {
  async createUser(userReq: ICreateUserReq) {
    const newUser = new User();
    const { name, password, email, verificationToken } = userReq;
    newUser.name = name;
    newUser.password = password;
    newUser.email = email;
    newUser.verificationToken = verificationToken;
    const savedUserFromDB = await dataSource.manager.save(newUser);
    return savedUserFromDB;
  }

  async getUserByVerificationToken(verificationToken: string) {
    const userFromDB = await dataSource.manager.update(
      User,
      { verificationToken },
      { isVerify: true, verificationToken: '' }
    );
    return userFromDB;
  }

  async getUserById(obj: IOptionalUser) {
    const userFromDB = await dataSource.manager.findOneBy(User, obj);
    return userFromDB;
  }

  async updateUser(userIdentity: IOptionalUser, objForUpdate: IOptionalUser) {
    const userFromDB = await dataSource.manager.update(User, userIdentity, objForUpdate);
    return userFromDB;
  }
}
