// TODO: Put a real interfaces here

import { Todo } from '../entities/Todo';
import { User } from '../entities/User';

export type ICreateUpdateTodo = Omit<Todo, 'id'>;
export type ICreateUserReq = Omit<User, 'id' | 'isVerify'>;
export type ISendEmailPops = { email: string; verificationToken: string };
