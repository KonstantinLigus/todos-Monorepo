// TODO: Put a real interfaces here
import passport from 'passport';
import { Request } from 'express';
import { Todo } from '../entities/Todo';
import { User } from '../entities/User';
import { Filter } from '../entities/Filter';

export type ICreateUpdateTodo = Omit<Todo, 'id'>;
export type ICreateUserReq = Omit<User, 'id' | 'isVerify' | 'filter'>;
export type ISendEmailPops = { email: string; verificationToken: string };
export type IOptionalUser = Partial<User>;

export type ILoginUserRes = passport.Profile & {
  email?: string;
};

type IFilterReq = {
  title: string;
  isComplete: string;
  isPrivate: string;
  perPage: number;
  page: number;
};

export type IReq = Request<{ todoId: string }, {}, Todo, IFilterReq> & {
  user: string;
  filters: Omit<Filter, 'owner'>;
};

export type ISendMailOptions = {
  email: string;
  verificationToken?: string;
  isVerify?: boolean;
  newPassword?: string;
};

export type ISendPassword = Omit<ISendMailOptions, 'verificationToken' | 'isVerify'>;

export type IError = Error & { status?: number; message?: string };

export class IReqError extends Error {
  status = 0;
}

export type ILoginRequest = Request & {
  user: { user: boolean; id: string };
  authInfo: { message: string };
};

export type IUser = {
  id: string;
  name: string;
  email: string;
};

export type IFilter = Partial<Filter>;

export type ITodoCount = {
  owner: string;
  filters: Omit<Filter, 'owner'>;
};

export type IFindTodos = {
  userId: string;
  filters?: Omit<Filter, 'owner'>;
  skip?: number;
  take?: number;
};
