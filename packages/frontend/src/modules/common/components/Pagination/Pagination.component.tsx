import React from 'react';
import Pagination from '@mui/material/Pagination';
import { Stack } from '@mui/material';
import { useGetFilteredTodos, useGetTodos } from '../../hooks';
import { APP_KEYS } from '../../consts';
import * as theme from '../../../theme';

export const PaginationComponent = () => {
  const { data } = useGetTodos();
  const { mutate } = useGetFilteredTodos();
  const onPageNumberClickHandler = (event: React.ChangeEvent<unknown>, page: number) => {
    mutate(`page=${page}&perPage=${APP_KEYS.BACKEND_KEYS.PER_PAGE}`);
  };
  const isTodos = data && data.todosFromDB.length !== 0 && data.pages !== 1;

  return isTodos ? (
    <Stack justifyContent="center" mt={theme.SPACES.m}>
      <Pagination
        count={data.pages}
        page={data.page}
        onChange={onPageNumberClickHandler}
        sx={{ mx: 'auto', maxWidth: '1100px' }}
      />
    </Stack>
  ) : null;
};
