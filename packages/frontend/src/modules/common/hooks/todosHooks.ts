import { useMutation, useQuery, useQueryClient } from 'react-query';
import { INewTodoItem, ITodoItem } from '../types/student.types';
import { UserService } from '../../servise/user.service';

const todosService = new UserService();

export const useGetTodos = () => {
  const getAllTodos = async () => {
    const res = await todosService.getTodos();
    return res.data;
  };

  return useQuery('todos', getAllTodos);
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  const deleteTodo = (id: string) => todosService.deleteTodo(id);

  const onSuccess = () => {
    queryClient.invalidateQueries('todos');
  };

  return useMutation(deleteTodo, { onSuccess });
};

export const useGetTodo = (id: string) => {
  const getTodo = async () => {
    const res = await todosService.getTodo(id);
    return res.data;
  };

  return useQuery('todo', getTodo);
};

export const useUpdateTodo = (id: string) => {
  const queryClient = useQueryClient();

  const updateTodo = (objForUpdate: ITodoItem) => todosService.putTodo(id, objForUpdate);

  const onSuccess = () => {
    queryClient.invalidateQueries('todos');
  };

  return useMutation(updateTodo, { onSuccess });
};

export const usePostNewTodo = () => {
  const queryClient = useQueryClient();

  const postTodo = (newTodo: INewTodoItem) => todosService.postTodo(newTodo);

  const onSuccess = () => queryClient.invalidateQueries('todos');

  return useMutation(postTodo, { onSuccess });
};
