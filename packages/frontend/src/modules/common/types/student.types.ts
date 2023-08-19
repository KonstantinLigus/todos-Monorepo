import { ButtonProps } from '@mui/material';
import { AxiosRequestConfig } from 'axios';
import { MouseEventHandler, ReactNode } from 'react';

export interface IStudentAuth {
  wallet: string;
  name?: string;
  email?: string;
  profileImage?: string;
  typeOfLogin?: string;
}

export interface IContainer {
  children: ReactNode;
}

export interface ITodoItem {
  isComplete?: boolean;
  isPrivate?: boolean;
}

export interface INewTodoItem {
  title: string;
  description: string;
}

export interface IButtonComponent extends ButtonProps {
  title: string;
  onClick?: MouseEventHandler;
  display?: string;
  itemId?: string;
  mr?: string;
  mt?: string;
  type?: 'submit' | 'button';
}

export interface IButtonStyled extends ButtonProps {
  display?: string;
}

export interface ISwitch {
  nameForLabel?: string;
  isChecked: boolean;
  callback: (isChecked: boolean) => void;
  ml?: string;
}

export interface ITodoList {
  todos: Array<{
    title: string;
    description: string;
    isComplete: boolean;
    isPrivate: boolean;
    id: string;
  }>;
  viewBtnClickHandler: MouseEventHandler;
  deleteBtnClickHandler: MouseEventHandler;
}

export interface IUrlAndDataFromConfig extends AxiosRequestConfig {
  url: string;
  data?: object;
}

export interface ITodo {
  title?: string;
  description?: string;
  isComplete?: boolean;
  isActive?: boolean;
}

export interface IUser {
  name: string;
  password: string;
  email: string;
}

export interface IResUser {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

export interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

export interface IUserLogIn {
  password: string;
  email: string;
}

export interface IData {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

export interface INavigation {
  closeNav: MouseEventHandler;
}

export interface IUserInfoMenu {
  closeMenu: Function;
}
