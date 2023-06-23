import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import { Container } from '../Container';
import { DesriptionStyled, TitleStyled } from './TodoItem.styled';
import { SwitchesGroup } from '../SwitcherForm';
import { ITodoItem } from '../../types/student.types';
import { ButtonComponent } from '../Button';

export const TodoItem: FC<ITodoItem> = ({ title, description }) => {
  const navigate = useNavigate();

  const onBackClickHandler = () => navigate('/todos');

  return (
    <Container>
      <div>
        <TitleStyled>{title}</TitleStyled>
        <DesriptionStyled>Desription</DesriptionStyled>
        <p>{description}</p>
      </div>
      <SwitchesGroup />
      <ButtonComponent title="Back" onClick={onBackClickHandler} display="block" />
    </Container>
  );
};
