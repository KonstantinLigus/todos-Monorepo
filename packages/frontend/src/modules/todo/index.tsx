import React from 'react';
import { TodoItem } from '../common/components/TodoItem';
import { Container } from '../common/components/Container';

const TodoPage = () => (
  <Container>
    <TodoItem title="Buy lemons" description="I got it" isComplete isPrivate={false} />
  </Container>
);

export default TodoPage;
