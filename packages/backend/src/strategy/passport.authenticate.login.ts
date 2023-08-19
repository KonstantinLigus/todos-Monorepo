import { Request, Response } from 'express';
import passport from 'passport';
import { IUser } from '../types/todos.type';
import { getToken } from '../helpers';

export const authenticateLogin = (req: Request, res: Response) =>
  passport.authenticate(
    'login',
    { session: false },
    (error: Error, user: IUser, { message }: { message: string }) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      if (!user) {
        const status = message === 'Wrong email' ? 404 : 401;
        return res.status(status).json({ message });
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        const { id, name, email } = user;
        const token = getToken({ id });
        return res.status(200).json({ user: { name, email }, token, message });
      });
    }
  )(req, res);
