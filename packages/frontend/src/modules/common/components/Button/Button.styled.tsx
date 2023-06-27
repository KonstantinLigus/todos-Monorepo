import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IButtonStyled } from '../../types/student.types';

export const ButtonStyled = styled(Button)<IButtonStyled>(({ display }) => ({
  display
}));
