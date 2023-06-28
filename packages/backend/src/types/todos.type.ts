// TODO: Put a real interfaces here
import passport from 'passport';
import { Request } from 'express';
import { Todo } from '../entities/Todo';
import { User } from '../entities/User';

export type ICreateUpdateTodo = Omit<Todo, 'id'>;
export type ICreateUserReq = Omit<User, 'id' | 'isVerify'>;
export type ISendEmailPops = { email: string; verificationToken: string };
export type IOptionalUser = Partial<User>;

export interface ILoginUserRes extends passport.Profile {
  email?: string;
}

export interface IReq extends Request {
  user: string;
}

export type ISendMailOptions = {
  email: string;
  verificationToken?: string;
  isVerify?: boolean;
  newPassword?: string;
};

export type ISendPassword = Omit<ISendMailOptions, 'verificationToken' | 'isVerify'>;
