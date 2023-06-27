/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import passport from 'passport';
import { genetateUUID, getToken, hashPassword, sendEmail } from '../helpers';
import UserService from '../services/users.service';
import { ICreateUserReq } from '../types/todos.type';

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
    await sendEmail({ email, verificationToken });
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
      async (err: ErrorCallback, user: passport.Profile, info: string) => {
        try {
          if (!user) {
            return res.status(400).json({
              message: info
            });
          }
          req.login(user, { session: false }, async (error) => {
            if (error) return res.send(err);
            const token = getToken({ id: user.id });
            return res.status(200).json({ token });
          });
        } catch (error) {
          return res.status(404).json({ message: error });
        }
      }
    )(req, res);
  }
}

const userController = new UserController(new UserService());
export default userController;
