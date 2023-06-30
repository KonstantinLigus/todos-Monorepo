import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosResponse } from 'axios';
import { ErrorResponse, IUser, IUserLogIn } from '../types/student.types';
import { UserService } from '../../servise/user.service';
import { APP_KEYS } from '../consts';

const userService = new UserService();

const getOnSuccess = (queryClient: QueryClient) => (res: AxiosResponse) => {
  queryClient.setQueryData(APP_KEYS.QUERY_KEYS.USER, res.data.createdUser);
  queryClient.setQueryData(APP_KEYS.QUERY_KEYS.IS_USER_LOGGED_IN, true);
  localStorage.setItem(APP_KEYS.STORAGE_KEYS.TOKEN, res.data.token);
};

export const useRegisterNewUser = () => {
  const queryClient = useQueryClient();
  const postNewUser = (newUser: IUser) => userService.postNewUser(newUser);
  return useMutation<AxiosResponse, ErrorResponse, IUser>(postNewUser, {
    onSuccess: getOnSuccess(queryClient)
  });
};

export const useLogInUser = () => {
  const queryClient = useQueryClient();
  const postLoginUser = (newUser: IUserLogIn) => userService.postLoginUser(newUser);
  return useMutation<AxiosResponse, ErrorResponse, IUserLogIn>(postLoginUser, {
    onSuccess: getOnSuccess(queryClient)
  });
};

export const useGetUserData = () => {
  const queryClient = useQueryClient();
  const getUserData = () =>
    queryClient.getQueryData<{ name: string; email: string }>(APP_KEYS.QUERY_KEYS.USER);
  return useQuery(APP_KEYS.QUERY_KEYS.USER, getUserData);
};

export const useGetIsUserLoggedIn = () => {
  const queryClient = useQueryClient();
  const isUserLoggedIn = () =>
    queryClient.getQueryData<boolean>(APP_KEYS.QUERY_KEYS.IS_USER_LOGGED_IN);
  return useQuery(APP_KEYS.QUERY_KEYS.IS_USER_LOGGED_IN, isUserLoggedIn);
};

export const useLogoutUser = () => {
  const queryClient = useQueryClient();

  const logOutUser = async () => {
    queryClient.setQueryData(APP_KEYS.QUERY_KEYS.USER, null);
    queryClient.setQueryData(APP_KEYS.QUERY_KEYS.IS_USER_LOGGED_IN, false);
    localStorage.setItem(APP_KEYS.STORAGE_KEYS.TOKEN, '');
  };

  return useMutation(logOutUser);
};
