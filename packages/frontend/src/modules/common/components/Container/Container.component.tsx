import React, { FC } from 'react';
import { IContainer } from '../../types/student.types';
import { ContainerStyled } from './Container.styled';

export const Container: FC<IContainer> = ({ children }) => (
  <ContainerStyled>{children}</ContainerStyled>
);
