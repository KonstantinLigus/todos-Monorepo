import React from 'react';
import { useNavigate } from 'react-router';
import { UserInfo } from '../UserInfo';
import {
  NavigationListStyled,
  NavLinkStyled,
  UserManagerStyled,
  UserNavigationStyled
} from './Navigation.styled';
import { ButtonComponent } from '../Button';
import { useLogoutUser, useGetIsUserLoggedIn } from '../../hooks/userHooks';
import { APP_KEYS } from '../../consts';

export const Navigation = () => {
  const navigate = useNavigate();
  const { data: isLoggedIn } = useGetIsUserLoggedIn();
  const { mutate: logOut } = useLogoutUser();
  const onLogOutClick = () => {
    logOut();
    navigate(APP_KEYS.ROUTER_KEYS.REGISTER);
  };
  return (
    <NavigationListStyled>
      <UserNavigationStyled>
        <NavLinkStyled to="" end>
          Home
        </NavLinkStyled>
        {!isLoggedIn && (
          <>
            <NavLinkStyled to={APP_KEYS.ROUTER_KEYS.REGISTER}>Register</NavLinkStyled>
            <NavLinkStyled to={APP_KEYS.ROUTER_KEYS.LOGIN}>LogIn</NavLinkStyled>
          </>
        )}
        {isLoggedIn && (
          <>
            <NavLinkStyled to={APP_KEYS.ROUTER_KEYS.TODO_CREATE}>New Todo</NavLinkStyled>
            <NavLinkStyled to={APP_KEYS.ROUTER_KEYS.TODOS}>Todos</NavLinkStyled>
          </>
        )}
      </UserNavigationStyled>
      {isLoggedIn && (
        <UserManagerStyled>
          <UserInfo />
          <ButtonComponent title="Log Out" onClick={onLogOutClick} />
        </UserManagerStyled>
      )}
    </NavigationListStyled>
  );
};
