import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router';
import { TodoListDesktop } from '../TodoListDesktop';
import { TodoListMobile } from '../TodoListMobile';
import { TodoListTablet } from '../TodoListTablet';
import * as theme from '../../../theme';
import { useDeleteTodo, useGetTodos } from '../../hooks';
import { APP_KEYS } from '../../consts';

export const TodoList = () => {
  const isMatchesDesctop = useMediaQuery(theme.MEDIA.desktop);
  const isMatchesTablet = useMediaQuery(theme.MEDIA.tablet);
  const isMatchesMobile = useMediaQuery(theme.MEDIA.mobile);

  const { data, isLoading, isSuccess, isError } = useGetTodos();

  const navigate = useNavigate();
  const deleteTodo = useDeleteTodo();

  const viewBtnClickHandler = (event: React.MouseEvent) => {
    const itemId = (event.target as HTMLButtonElement).dataset.id;
    navigate(`${APP_KEYS.ROUTER_KEYS.TODO}/${itemId}`);
  };

  const deleteBtnClickHandler = (event: React.MouseEvent) => {
    const itemId = (event.target as HTMLButtonElement).dataset.id;
    deleteTodo.mutate(itemId as string);
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isError && <div>An error has occurred </div>}
      {isMatchesDesctop && isSuccess && (
        <TodoListDesktop
          todos={data.todosFromDB}
          viewBtnClickHandler={viewBtnClickHandler}
          deleteBtnClickHandler={deleteBtnClickHandler}
        />
      )}
      {isMatchesMobile && isSuccess && (
        <TodoListMobile
          todos={data.todosFromDB}
          viewBtnClickHandler={viewBtnClickHandler}
          deleteBtnClickHandler={deleteBtnClickHandler}
        />
      )}
      {isMatchesTablet && isSuccess && (
        <TodoListTablet
          todos={data.todosFromDB}
          deleteBtnClickHandler={deleteBtnClickHandler}
          viewBtnClickHandler={viewBtnClickHandler}
        />
      )}
    </>
  );
};
