import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosResponse } from 'axios';
import { ErrorResponse, IUser, IData, IUserLogIn } from '../types/student.types';
import { UserService } from '../../servise/user.service';
import { APP_KEYS } from '../consts';

const userService = new UserService();

const getOnSuccess = (queryClient: QueryClient) => (res: AxiosResponse) => {
  queryClient.setQueryData(APP_KEYS.QUERY_KEYS.USER, res.data);
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
  const token = localStorage.getItem(APP_KEYS.STORAGE_KEYS.TOKEN);

  const getUserData = async () => {
    const res = await userService.refreshUser();
    return res.data;
  };
  const onSuccess = (data: IData) => {
    if (data) {
      localStorage.setItem(APP_KEYS.STORAGE_KEYS.TOKEN, data.token);
    }
  };

  return useQuery(APP_KEYS.QUERY_KEYS.USER, getUserData, {
    onSuccess,
    enabled: !!token
  });
};

export const useLogoutUser = () => {
  const queryClient = useQueryClient();

  const logOutUser = async () => {
    queryClient.setQueryData(APP_KEYS.QUERY_KEYS.USER, null);
    localStorage.setItem(APP_KEYS.STORAGE_KEYS.TOKEN, '');
  };

  return useMutation(logOutUser);
};
