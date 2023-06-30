import { useMutation, useQuery, useQueryClient } from 'react-query';
import { INewTodoItem, ITodoItem } from '../types/student.types';
import { TodoService } from '../../servise/todo.service';
import { APP_KEYS } from '../consts';

const todosService = new TodoService();

export const useGetTodos = () => {
  const getAllTodos = async () => {
    const res = await todosService.getTodos();
    return res.data;
  };

  return useQuery(APP_KEYS.QUERY_KEYS.TODOS, getAllTodos);
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  const deleteTodo = (id: string) => todosService.deleteTodo(id);

  const onSuccess = () => {
    queryClient.invalidateQueries(APP_KEYS.QUERY_KEYS.TODOS);
  };

  return useMutation(deleteTodo, { onSuccess });
};

export const useGetTodo = (id: string) => {
  const getTodo = async () => {
    const res = await todosService.getTodo(id);
    return res.data;
  };

  return useQuery(APP_KEYS.QUERY_KEYS.TODO, getTodo);
};

export const useUpdateTodo = (id: string) => {
  const queryClient = useQueryClient();

  const updateTodo = (objForUpdate: ITodoItem) => todosService.putTodo(id, objForUpdate);

  const onSuccess = () => {
    queryClient.invalidateQueries(APP_KEYS.QUERY_KEYS.TODOS);
  };

  return useMutation(updateTodo, { onSuccess });
};

export const usePostNewTodo = () => {
  const queryClient = useQueryClient();

  const postTodo = (newTodo: INewTodoItem) => todosService.postTodo(newTodo);

  const onSuccess = () => queryClient.invalidateQueries(APP_KEYS.QUERY_KEYS.TODOS);

  return useMutation(postTodo, { onSuccess });
};
