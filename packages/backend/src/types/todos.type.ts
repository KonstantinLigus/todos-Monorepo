// TODO: Put a real interfaces here

import { Todo } from '../entities/Todo';

export type ICreateTodo = Omit<Todo, 'id'>;

export type IUpdateTodo = Todo & { id: Todo['id'] };
