import React from 'react';
import { getHeaderTitle } from '@react-navigation/elements';

import { LogoutSvg } from './LogoutSvg';
import { BackButtonSvg } from './BackButtonSvg';

import * as Styled from './MainHeader.styled';
import themes from '../../utils/themes';

const backButtonHeaders = ['Create', 'Comments'];
const noHeaderScreens = ['Profile'];

export const MainHeader = ({ navigation, route, options, back, setIsAuth }) => {
  const title = getHeaderTitle(options, route.name);
  const isBackButtonHeaders = backButtonHeaders.includes(route.name);
  const isNoHeader = noHeaderScreens.includes(route.name);

  const handleLogout = () => {
    setIsAuth(false);
  };

  return (
    !isNoHeader && (
      <Styled.HeaderContainer>
        <Styled.BackButtonWrapper
          isVisible={isBackButtonHeaders}
          onPress={() => navigation.goBack()}
        >
          <BackButtonSvg color={themes.primary.colors.iconInactive} />
        </Styled.BackButtonWrapper>
        <Styled.HeaderTitle>{title}</Styled.HeaderTitle>
        <Styled.LogoutWrapper
          onPress={handleLogout}
          isVisible={!isBackButtonHeaders}
        >
          <LogoutSvg color={themes.primary.colors.lightGrey} />
        </Styled.LogoutWrapper>
      </Styled.HeaderContainer>
    )
  );
};
