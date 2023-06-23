import { ButtonProps } from '@mui/material';
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
  title: string;
  description: string;
  isComplete: boolean;
  isPrivate: boolean;
}

export interface IButtonComponent extends ButtonProps {
  title: string;
  onClick: MouseEventHandler;
  display?: string;
  itemId?: string;
  mr?: string;
}

export interface IButtonStyled extends ButtonProps {
  display?: string;
}

export interface ISwitch {
  nameForLabel?: string;
  isLabel?: boolean;
  isChecked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
