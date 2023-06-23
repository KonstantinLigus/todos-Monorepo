import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import { DesriptionStyled, TitleStyled } from './TodoItem.styled';
import { SwitchComponent } from '../Switch';
import { ITodoItem } from '../../types/student.types';
import { ButtonComponent } from '../Button';

export const TodoItem: FC<ITodoItem> = ({ title, description, isComplete, isPrivate }) => {
  const navigate = useNavigate();
  const [isCompleteChecked, setIsCompleteChecked] = React.useState(isComplete);
  const [isPrivateChecked, setIsPrivateChecked] = React.useState(isPrivate);

  const isCompleteCheckHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCompleteChecked(event.target.checked);
  };

  const isPrivateCheckHandker = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPrivateChecked(event.target.checked);
  };

  const onBackClickHandler = () => navigate('/todos');

  return (
    <>
      <div>
        <TitleStyled>{title}</TitleStyled>
        <DesriptionStyled>Desription</DesriptionStyled>
        <p>{description}</p>
      </div>
      <SwitchComponent
        nameForLabel="isComplete"
        isLabel
        isChecked={isCompleteChecked}
        onChange={isCompleteCheckHandler}
      />
      <SwitchComponent
        nameForLabel="isPrivate"
        isChecked={isPrivateChecked}
        isLabel
        onChange={isPrivateCheckHandker}
      />
      <ButtonComponent title="Back" onClick={onBackClickHandler} display="block" />
    </>
  );
};
