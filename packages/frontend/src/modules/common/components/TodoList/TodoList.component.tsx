import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router';
import { Typography } from '@mui/material';
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

  let isTodos;
  if (data) {
    isTodos = data.todosFromDB.length !== 0;
  }

  const navigate = useNavigate();
  const deleteTodo = useDeleteTodo();

  const viewBtnClickHandler = (event: React.SyntheticEvent<EventTarget>) => {
    if (!(event.target instanceof HTMLButtonElement)) {
      return;
    }
    const itemId = event.target.dataset.id;
    navigate(`${APP_KEYS.ROUTER_KEYS.TODO}/${itemId}`);
  };

  const deleteBtnClickHandler = (event: React.SyntheticEvent<EventTarget>) => {
    if (!(event.target instanceof HTMLButtonElement)) {
      return;
    }
    const itemId = event.target.dataset.id;
    if (typeof itemId !== 'string') return <div>wrong todo&apos;s id</div>;
    deleteTodo.mutate(itemId);
  };

  return (
    <>
      {isSuccess && !isTodos && (
        <Typography variant="subtitle1" gutterBottom>
          There is no todos
        </Typography>
      )}
      {isLoading && <div>Loading...</div>}
      {isError && <div>An error has occurred </div>}
      {isSuccess && isTodos && isMatchesDesctop && (
        <TodoListDesktop
          todos={data.todosFromDB}
          viewBtnClickHandler={viewBtnClickHandler}
          deleteBtnClickHandler={deleteBtnClickHandler}
        />
      )}
      {isSuccess && isTodos && isMatchesMobile && (
        <TodoListMobile
          todos={data.todosFromDB}
          viewBtnClickHandler={viewBtnClickHandler}
          deleteBtnClickHandler={deleteBtnClickHandler}
        />
      )}
      {isSuccess && isTodos && isMatchesTablet && (
        <TodoListTablet
          todos={data.todosFromDB}
          deleteBtnClickHandler={deleteBtnClickHandler}
          viewBtnClickHandler={viewBtnClickHandler}
        />
      )}
    </>
  );
};
