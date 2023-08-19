/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import {
  genetateUUID,
  getToken,
  hashPassword,
  sendNewPasswordByEmail,
  sendVerificationTokenByEmail
} from '../helpers';
import UserService from '../services/users.service';
import { ICreateUserReq, IReq, IReqError } from '../types/todos.type';

class UserController {
  constructor(private userService: UserService) {}

  async userRegistration(req: Request, res: Response) {
    const { password, email, name } = req.body;
    const hashedPassword = await hashPassword(password);
    const verificationToken = genetateUUID();
    const userToDB: ICreateUserReq = {
      name,
      email,
      password: hashedPassword,
      verificationToken
    };
    const userFromDB = await this.userService.createUser(userToDB);
    await sendVerificationTokenByEmail({ email, verificationToken });
    const token = getToken({ id: userFromDB.id });
    res.status(201).json({
      user: {
        name: userFromDB.name,
        email: userFromDB.email
      },
      token
    });
  }

  async verifyUser(req: Request, res: Response) {
    const userFromDB = await this.userService.getUserByVerificationToken(
      req.params.verificationToken
    );
    if (!userFromDB) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json({ message: 'Verification successful' });
  }

  async refreshUser(req: IReq, res: Response) {
    const userId = req.user;
    const userFromDB = await this.userService.getUserBy({ id: userId });
    if (!userFromDB) {
      const error = new IReqError('User not found');
      error.status = 404;
      throw error;
    }
    if (userFromDB) {
      const { name, email, id } = userFromDB;
      const token = getToken({ id });
      return res.status(200).json({ user: { name, email }, token });
    }
  }

  async changePassword(req: Request, res: Response) {
    const { email } = req.body;
    const userFromDB = await this.userService.getUserBy({ email });
    if (userFromDB) {
      const newPassword = genetateUUID();
      const newHashedPassword = await hashPassword(newPassword);
      await this.userService.updateUser(
        { email: userFromDB.email },
        { password: newHashedPassword }
      );
      await sendNewPasswordByEmail({ newPassword, email });
      res.status(200).json({ message: `new password was send on your email: ${userFromDB.email}` });
      return;
    }
    res.status(404).json({ message: 'User not found' });
  }
}

const userController = new UserController(new UserService());
export default userController;
