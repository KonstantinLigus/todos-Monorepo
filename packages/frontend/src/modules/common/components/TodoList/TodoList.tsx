import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router';
import { ButtonComponent } from '../Button';
import { SwitchComponent } from '../Switch';
import * as theme from '../../../theme';

const myRow = [
  { title: 'title1', description: 'description1', isComplete: true, isPrivate: false, id: '1' },
  { title: 'title2', description: 'description2', isComplete: false, isPrivate: true, id: '2' },
  { title: 'title3', description: 'description3', isComplete: false, isPrivate: true, id: '3' },
  { title: 'title4', description: 'description4', isComplete: false, isPrivate: true, id: '4' },
  { title: 'title5', description: 'description5', isComplete: false, isPrivate: true, id: '5' }
];

const borderLeftRightStyle = { borderRight: 'solid', borderLeft: 'solid', borderColor: '#e0e0e0' };

const titleStyle = { width: '150px' };

const descriptionStyle = { ...borderLeftRightStyle, width: '500px' };

const tableStyle = {
  ...borderLeftRightStyle,
  color: '#e0e0e0',
  borderTop: 'solid'
};

export const TodoList = () => {
  const navigate = useNavigate();

  const onViewClickHandler = (event: React.MouseEvent) => {
    const itemId = (event.target as HTMLButtonElement).dataset.id;
    navigate(`/todo/${itemId}`);
  };

  return (
    <TableContainer component={Paper} sx={{ overflow: 'auto' }}>
      <Table stickyHeader style={tableStyle} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" style={titleStyle}>
              Todo Title
            </TableCell>
            <TableCell align="center" style={descriptionStyle}>
              Description
            </TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myRow.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="left" style={descriptionStyle}>
                {row.description}
              </TableCell>
              <TableCell align="right" style={{ width: '200px' }}>
                <ButtonComponent
                  title="View"
                  onClick={onViewClickHandler}
                  display="inline-block"
                  itemId={row.id}
                  mr={theme.SPACES.s}
                />
                <ButtonComponent
                  title="Delete"
                  onClick={onViewClickHandler}
                  display="inline-block"
                  itemId={row.id}
                />
                <SwitchComponent isChecked isLabel={false} onChange={() => 'hello'} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
