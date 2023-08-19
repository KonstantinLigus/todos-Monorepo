import React, { FC } from 'react';
import { Divider, List, ListItem, ListItemText } from '@mui/material';
import { ITodoList } from '../../types/student.types';
import { ButtonComponent } from '../Button';
import * as theme from '../../../theme';

export const TodoListMobile: FC<ITodoList> = ({
  todos,
  deleteBtnClickHandler,
  viewBtnClickHandler
}) => (
  <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
    {todos.map((todo) => (
      <ListItem key={todo.id} disableGutters sx={{ flexDirection: 'column', alignItems: 'start' }}>
        <ListItemText primary={todo.title} secondary={todo.description} />
        <span>
          <ButtonComponent
            title="View"
            mr={theme.SPACES.l}
            itemId={todo.id}
            onClick={viewBtnClickHandler}
            type="button"
          />
          <ButtonComponent
            title="Delete"
            itemId={todo.id}
            onClick={deleteBtnClickHandler}
            type="button"
          />
        </span>
        <Divider flexItem sx={{ mt: theme.SPACES.l }} />
      </ListItem>
    ))}
  </List>
);
