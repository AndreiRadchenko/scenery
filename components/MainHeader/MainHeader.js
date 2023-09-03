import React from 'react';
import { getHeaderTitle } from '@react-navigation/elements';

import { LogoutSvg } from './LogoutSvg';

import * as Styled from './MainHeader.styled';
import themes from '../../utils/themes';

export const MainHeader = ({ navigation, route, options, back, setIsAuth }) => {
  const title = getHeaderTitle(options, route.name);
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
          <LogoutSvg color={themes.primary.colors.lightGrey} />
        </Styled.LogoutWrapper>
      </Styled.HeaderContainer>
    </>
  );
};
