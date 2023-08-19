import React from 'react';
import styled from 'styled-components';
import { Container } from '../../common/components/Container';

export const TytleStyled = styled.h1`
  text-align: center;
`;
export const HomePage = () => (
  <Container>
    <TytleStyled>Welcome to the Todos!</TytleStyled>
  </Container>
);
