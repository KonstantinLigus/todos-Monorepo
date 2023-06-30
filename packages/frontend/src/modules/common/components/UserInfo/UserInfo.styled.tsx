import styled from 'styled-components';

export const UserInfoWrap = styled.div`
  display: inline-flex;
`;

export const UserSubscriptionWrap = styled.div`
  display: inline;
  margin-left: 10px;
  width: 80px;
`;

export const SubscriptionEnumWrap = styled.ul`
  margin-top: 5px;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  //
`;

export const SubscriptionChoice = styled.li`
  height: 25px;
  padding: 0 5px;
  cursor: pointer;
  :hover {
    color: rgb(255, 255, 255);
    background-color: rgb(0, 0, 255);
  }
`;

export const SubscriptionChange = styled.p`
  font-size: 14px;
  color: rgb(0, 0, 255);
  text-decoration: underline;
  cursor: pointer;
`;

export const Subscription = styled.p`
  height: 25px;
  width: 80px;
  line-height: 20px;
  font-weight: 400;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  border-color: rgb(0, 0, 255);
`;

export const LogOutBtn = styled.button`
  height: 30px;
  margin-left: 10px;
  font-size: 15px;
  cursor: pointer;
  background-color: rgb(161, 200, 231);
  border-color: rgb(161, 200, 231);
`;

export const UserAvatar = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 5px;
`;

export const UserName = styled.p`
  font-size: 20px;
  font-weight: 400;
`;
