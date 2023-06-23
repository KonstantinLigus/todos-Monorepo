import React, { FC } from 'react';
import { Button } from '@mui/material';
import { IButtonComponent } from '../../types/student.types';

export const ButtonComponent: FC<IButtonComponent> = ({ title, onClick, display, id, mr }) => (
  <Button variant="contained" onClick={onClick} sx={{ display, mr }} data-id={id}>
    {title}
  </Button>
);
