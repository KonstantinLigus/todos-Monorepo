import styled from 'styled-components';

export const TitleStyled = styled('h2')`
  margin-bottom: ${({ theme }) => theme.SPACES.xxxl};
`;

export const DesriptionStyled = styled('h3')`
  margin-bottom: ${({ theme }) => theme.SPACES.m};
`;

export const ItemWrapperStyled = styled('div')`
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;
