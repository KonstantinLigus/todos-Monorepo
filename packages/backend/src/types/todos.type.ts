// TODO: Put a real interfaces here

import { Todo } from '../entities/Todo';

export type ICreateUpdateTodo = Omit<Todo, 'id'>;
