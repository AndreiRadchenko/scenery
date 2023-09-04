import React from 'react';
import { getHeaderTitle } from '@react-navigation/elements';

import { LogoutSvg, BackButtonSvg } from '.';

import * as Styled from './MainHeader.styled';
import themes from '../../utils/themes';

export const MainHeader = ({ navigation, route, options, back, setIsAuth }) => {
  const title = getHeaderTitle(options, route.name);
  const isCreateScreen = route.name === 'Create';

  const handleLogout = () => {
    setIsAuth(false);
  };

  return (
    <Styled.HeaderContainer>
      <Styled.BackButtonWrapper
        isVisible={isCreateScreen}
        onPress={() => navigation.goBack()}
      >
        <BackButtonSvg color={themes.primary.colors.iconInactive} />
      </Styled.BackButtonWrapper>
      <Styled.HeaderTitle>{title}</Styled.HeaderTitle>
      <Styled.LogoutWrapper onPress={handleLogout} isVisible={!isCreateScreen}>
        <LogoutSvg color={themes.primary.colors.lightGrey} />
      </Styled.LogoutWrapper>
    </Styled.HeaderContainer>
  );
};
