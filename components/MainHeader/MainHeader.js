import React from 'react';
import { getHeaderTitle } from '@react-navigation/elements';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { LogoutSvg } from './LogoutSvg';
import { BackButtonSvg } from './BackButtonSvg';

import * as Styled from './MainHeader.styled';
import themes from '../../utils/themes';
import { getHeaderLabel } from '../../helpers/getHeaderLabel';
import { SCREEN, STACK } from '../../navigation/constants';
import { getMainHeaderVisibility } from '../../helpers/getTabBarVisibility';
import { logOut } from '../../redux/auth/auth-operations';
import { resetUserPostsState } from '../../redux/userPosts/userPosts-slice';

const backButtonHeaders = [
  SCREEN.MAIN.CREATE_POST,
  STACK.CREATE_POST,
  SCREEN.MAIN.COMMENTS,
  SCREEN.MAIN.MAP,
];

export const MainHeader = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const routeName = getFocusedRouteNameFromRoute(route) ?? route.name;
  const title = getHeaderLabel(route);
  const displayOption = getMainHeaderVisibility(route);

  const previousScreen =
    route?.params?.prevScreen ?? route?.params?.params?.prevScreen;

  const isBackButtonHeaders = backButtonHeaders.includes(routeName);

  const handleLogout = () => {
    dispatch(resetUserPostsState());
    dispatch(logOut());
  };

  return (
    <Styled.HeaderContainer displayOption={displayOption}>
      <Styled.BackButtonWrapper
        isVisible={isBackButtonHeaders}
        onPress={() => {
          navigation.navigate(previousScreen);
        }}
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
  );
};
