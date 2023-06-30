import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const NavigationListStyled = styled.nav`
  display: flex;
  padding: 10px;
  height: 100px;
  text-align: center;
  justify-content: center;
  font-weight: 300;
  @media (max-width: 520px) {
    height: 160px;
    flex-direction: column;
    justify-content: start;
  }
`;

export const UserManagerStyled = styled.div`
  margin-left: 20px;
  font-size: 20px;
  @media (max-width: 520px) {
    margin-left: 0;
    margin-top: 20px;
  }
`;

export const UserNavigationStyled = styled.ul`
  font-size: 20px;
`;

export const NavLinkStyled = styled(NavLink)`
  :not(:first-child) {
    margin-left: 10px;
  }
  &.active {
    color: blue;
  }
`;
