import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { DesriptionStyled, ItemWrapperStyled, TitleStyled } from './TodoItem.styled';
import { SwitchComponent } from '../Switch';
import { ButtonComponent } from '../Button';
import { useGetTodo, useUpdateTodo } from '../../hooks';
import { APP_KEYS } from '../../consts';

export const TodoItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { mutate } = useUpdateTodo(id as string);
  const { data, isLoading, isSuccess, isError, remove } = useGetTodo(id as string);

  const completeCheckHandler = (isChecked: boolean): boolean => {
    mutate({ isComplete: isChecked });
    return isChecked;
  };

  const privateCheckHandler = (isChecked: boolean): boolean => {
    mutate({ isPrivate: isChecked });
    return isChecked;
  };

  const onBackClickHandler = () => {
    remove();
    navigate(APP_KEYS.ROUTER_KEYS.TODOS);
  };

  if (isLoading) <div>Loading...</div>;
  if (isError) <div>An error has occurred </div>;
  if (isSuccess) {
    const { title, description, isComplete, isPrivate } = data.todoFromDB;
    return (
      <ItemWrapperStyled>
        <div>
          <TitleStyled>{title}</TitleStyled>
          <DesriptionStyled>Desription</DesriptionStyled>
          <p>{description}</p>
        </div>
        <SwitchComponent
          nameForLabel="isComplete"
          isLabel
          isChecked={isComplete}
          callback={completeCheckHandler}
        />
        <SwitchComponent
          nameForLabel="isPrivate"
          isChecked={isPrivate}
          isLabel
          callback={privateCheckHandler}
        />
        <ButtonComponent title="Back" onClick={onBackClickHandler} display="block" />
      </ItemWrapperStyled>
    );
  }
};
