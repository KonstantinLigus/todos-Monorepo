import React from 'react';
import { TodoList } from '../../common/components/TodoList';
import { Container } from '../../common/components/Container';
import { PaginationComponent } from '../../common/components/Pagination';

const TodosPage = () => (
  <Container>
    <TodoList />
    <PaginationComponent />
  </Container>
);

export default TodosPage;
