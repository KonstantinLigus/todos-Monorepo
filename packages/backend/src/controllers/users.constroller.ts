/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import passport from 'passport';
import {
  genetateUUID,
  getToken,
  hashPassword,
  sendNewPasswordByEmail,
  sendVerificationTokenByEmail
} from '../helpers';
import UserService from '../services/users.service';
import { ICreateUserReq, ILoginUserRes } from '../types/todos.type';

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
      createdUser: {
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

  async loginUser(req: Request, res: Response) {
    passport.authenticate(
      'login',
      { session: false },
      async (err: ErrorCallback, user: passport.Profile, info: object) => {
        try {
          if (!user) {
            return res.status(400).json({
              message: info
            });
          }
          req.login(user, { session: false }, async (error) => {
            if (error) return res.send(error);
            const token = getToken({ id: user.id });
            const { name, email, id }: ILoginUserRes = user;
            return res.status(200).json({ user: { name, email, id }, token, ...info });
          });
        } catch (error) {
          return res.status(404).json({ message: error });
        }
      }
    )(req, res);
  }

  async changePassword(req: Request, res: Response) {
    const { email } = req.body;
    const userFromDB = await this.userService.getUserById({ email });
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
