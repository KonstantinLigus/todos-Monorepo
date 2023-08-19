import React, { FC } from 'react';
import { List, ListItemButton, useMediaQuery } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useGetUserData } from '../../hooks/userHooks';
import { APP_KEYS } from '../../consts';
import * as theme from '../../../theme';
import { INavigation } from '../../types/student.types';

export const Navigation: FC<INavigation> = ({ closeNav }) => {
  const { data } = useGetUserData();

  const isMatchesDesctop = useMediaQuery(theme.MEDIA.desktop);
  const isMatchesTablet = useMediaQuery(theme.MEDIA.tablet);
  const isMatchesMobile = useMediaQuery(theme.MEDIA.mobile);

  const isMatchesMobileOrTablet = isMatchesMobile || isMatchesTablet;

  return (
    <List
      sx={{
        display: 'flex',
        flexDirection() {
          if (isMatchesMobileOrTablet) return 'column';
          if (isMatchesDesctop) return 'row';
        },
        '& a.active': { color: theme.COLORS.primary },
        fontSize: theme.FONTS.SIZES.l
      }}
      disablePadding
      dense
    >
      <ListItemButton component={NavLink} to="" end onClick={closeNav}>
        Home
      </ListItemButton>
      {!data?.user && (
        <>
          <ListItemButton component={NavLink} to={APP_KEYS.ROUTER_KEYS.REGISTER} onClick={closeNav}>
            Register
          </ListItemButton>
          <ListItemButton component={NavLink} to={APP_KEYS.ROUTER_KEYS.LOGIN} onClick={closeNav}>
            LogIn
          </ListItemButton>
        </>
      )}
      {data?.user && (
        <>
          <ListItemButton
            component={NavLink}
            to={APP_KEYS.ROUTER_KEYS.TODO_CREATE}
            onClick={closeNav}
          >
            New Todo
          </ListItemButton>
          <ListItemButton component={NavLink} to={APP_KEYS.ROUTER_KEYS.TODOS} onClick={closeNav}>
            Todos
          </ListItemButton>
        </>
      )}
    </List>
  );
};
