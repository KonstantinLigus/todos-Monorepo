import React, { FC } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ButtonComponent } from '../Button';
import * as theme from '../../../theme';
import { ITodoList } from '../../types/student.types';

const borderLeftRightStyle = {
  borderRight: 'solid',
  borderLeft: 'solid',
  borderColor: theme.COLORS.secondary
};

const titleStyle = { width: '150px' };

const descriptionStyle = { ...borderLeftRightStyle, maxWidth: '700px' };

const tableContainerStyles = {
  ...borderLeftRightStyle,
  maxHeight: '85vh',
  maxWidth: '1100px',
  margin: 'auto',
  borderTop: 'solid',
  borderBottom: 'solid',
  color: theme.COLORS.secondary,
  overflow: 'auto',
  boxShadow: 'none'
};

const actionsStyle = { maxWidth: '200px' };

export const TodoListDesktop: FC<ITodoList> = ({
  todos,
  deleteBtnClickHandler,
  viewBtnClickHandler
}) => (
  <TableContainer component={Paper} style={tableContainerStyles}>
    <Table stickyHeader aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="center" style={titleStyle}>
            Todo Title
          </TableCell>
          <TableCell align="center" style={descriptionStyle}>
            Description
          </TableCell>
          <TableCell align="center" style={actionsStyle}>
            Actions
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {todos.map((todo) => (
          <TableRow
            key={todo.id}
            sx={{ '&:last-child td, &:last-child th, &:last-child tr': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {todo.title}
            </TableCell>
            <TableCell align="left" style={descriptionStyle}>
              {todo.description}
            </TableCell>
            <TableCell align="center" style={actionsStyle}>
              <ButtonComponent
                title="View"
                onClick={viewBtnClickHandler}
                display="inline-block"
                itemId={todo.id}
                mr={theme.SPACES.s}
              />
              <ButtonComponent
                title="Delete"
                onClick={deleteBtnClickHandler}
                display="inline-block"
                itemId={todo.id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
