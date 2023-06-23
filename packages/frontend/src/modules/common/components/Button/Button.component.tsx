import React, { FC } from 'react';
import { IButtonComponent } from '../../types/student.types';
import { ButtonStyled } from './Button.styled';

export const ButtonComponent: FC<IButtonComponent> = ({ title, onClick, display }) => (
  <ButtonStyled variant="contained" onClick={onClick} display={display}>
    {title}
  </ButtonStyled>
);
