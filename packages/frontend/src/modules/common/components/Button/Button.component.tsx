import React, { FC } from 'react';
import { Button } from '@mui/material';
import { IButtonComponent } from '../../types/student.types';

export const ButtonComponent: FC<IButtonComponent> = ({
  title,
  onClick,
  display,
  itemId,
  mr,
  mt,
  type
}) => (
  <Button
    variant="contained"
    onClick={onClick}
    sx={{ display, mr, mt }}
    data-id={itemId}
    type={type}
  >
    {title}
  </Button>
);
