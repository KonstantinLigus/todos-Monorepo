import React from 'react';

import { UserInfoWrap, UserName } from './UserInfo.styled';
import { useGetUserData } from '../../hooks/userHooks';

export const UserInfo = () => {
  const { data: user } = useGetUserData();
  if (typeof user === 'object') {
    return (
      <UserInfoWrap>
        <UserName>{user.name}</UserName>
        <UserName>{user.email}</UserName>
      </UserInfoWrap>
    );
  }
};
