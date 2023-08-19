import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosResponse } from 'axios';
import { INewTodoItem, ITodoItem } from '../types/student.types';
import { TodoService } from '../../servise/todo.service';
import { APP_KEYS } from '../consts';

const todosService = new TodoService();

export const useGetTodos = () => {
  const getAllTodos = async () => {
    const res = await todosService.getFilteredTodos(
      `perPage=${APP_KEYS.BACKEND_KEYS.PER_PAGE}&page=1`
    );
    return res.data;
  };

  return useQuery(APP_KEYS.QUERY_KEYS.TODOS, getAllTodos);
};

export const useGetFilteredTodos = () => {
  const queryClient = useQueryClient();

  const filterTodos = async (filter: string) => todosService.getFilteredTodos(filter);

  const onSuccess = (res: AxiosResponse) => {
    queryClient.setQueryData(APP_KEYS.QUERY_KEYS.TODOS, res.data);
    queryClient.invalidateQueries(APP_KEYS.QUERY_KEYS.FILTER);
  };

  return useMutation(filterTodos, { onSuccess });
};

export const useGetFilter = () => {
  const getFilter = async () => {
    const res = await todosService.getFilter();
    return res.data;
  };

  return useQuery(APP_KEYS.QUERY_KEYS.FILTER, getFilter);
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
    return res.data.todoFromDB;
  };

  return useQuery(APP_KEYS.QUERY_KEYS.TODO, getTodo);
};

export const useUpdateTodo = (id: string) => {
  const queryClient = useQueryClient();

  const updateTodo = (objForUpdate: ITodoItem) => todosService.putTodo(id, objForUpdate);

  const onSuccess = (res: AxiosResponse) => {
    queryClient.invalidateQueries(APP_KEYS.QUERY_KEYS.TODOS);
    queryClient.setQueryData(APP_KEYS.QUERY_KEYS.TODO, res.data.updatedTodo);
  };

  return useMutation(updateTodo, { onSuccess });
};

export const usePostNewTodo = () => {
  const queryClient = useQueryClient();

  const postTodo = (newTodo: INewTodoItem) => todosService.postTodo(newTodo);

  const onSuccess = () => queryClient.invalidateQueries(APP_KEYS.QUERY_KEYS.TODOS);

  return useMutation(postTodo, { onSuccess });
};
