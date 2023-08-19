import React, { FC } from 'react';

import { List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router';
import { useGetUserData, useLogoutUser } from '../../hooks/userHooks';
import { ButtonComponent } from '../Button';
import { APP_KEYS } from '../../consts';
import { IUserInfoMenu } from '../../types/student.types';
import * as theme from '../../../theme';

export const UserInfo: FC<IUserInfoMenu> = ({ closeMenu }) => {
  const { data } = useGetUserData();
  const { mutate: logOut } = useLogoutUser();
  const navigate = useNavigate();

  const isMatchesDesctop = useMediaQuery(theme.MEDIA.desktop);

  const onLogOutClick = () => {
    logOut();
    navigate(APP_KEYS.ROUTER_KEYS.REGISTER);
    closeMenu();
  };

  if (data?.user) {
    return (
      <List sx={{ display: isMatchesDesctop ? 'flex' : 'block' }}>
        <ListItem>
          <ListItemText sx={{ mr: isMatchesDesctop ? theme.SPACES.s : 0 }}>
            {data?.user.name}
          </ListItemText>
          <ButtonComponent title="Log Out" onClick={onLogOutClick} type="button" color="warning" />
        </ListItem>
        <ListItem>{data?.user.email}</ListItem>
      </List>
    );
  }
};
