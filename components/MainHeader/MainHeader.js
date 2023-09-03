import React from 'react';
import { View, Text } from 'react-native';

import { LogoutSvg } from './LogoutSvg';
import { PostsSvg } from '../BottomTabNavigator';

import * as Styled from './MainHeader.styled';
import themes from '../../utils/themes';

export const MainHeader = ({ title, navigation, setIsAuth }) => {
  const handleLogout = () => {
    setIsAuth(false);
  };
  return (
    <>
      <Styled.HeaderContainer
      // leftButton={
      //   back ? <MyBackButton onPress={navigation.goBack} /> : undefined
      // }
      >
        <Styled.HeaderTitle>{title}</Styled.HeaderTitle>
        <Styled.LogoutWrapper onPress={handleLogout}>
          <LogoutSvg color={themes.primary.colors.iconInactive} />
        </Styled.LogoutWrapper>
      </Styled.HeaderContainer>
    </>
  );
};
