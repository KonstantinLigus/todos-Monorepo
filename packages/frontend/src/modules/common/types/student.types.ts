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
  type?: 'submit';
}

export interface IButtonStyled extends ButtonProps {
  display?: string;
}

export interface ISwitch {
  nameForLabel?: string;
  isLabel?: boolean;
  isChecked: boolean;
  callback: (isChecked: boolean) => boolean;
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
  data?: object;
  url: string;
}

export interface ITodo {
  title?: string;
  description?: string;
  isComplete?: boolean;
  isActive?: boolean;
}
