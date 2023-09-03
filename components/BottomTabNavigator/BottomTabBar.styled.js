import { styled } from 'styled-components/native';
import { ImageBackground, Text } from 'react-native';
import { BottomTabBar, BottomTabBarItem } from '@react-navigation/bottom-tabs';

import themes from '../../utils/themes';

export const TabBar = styled.View`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: row;
  height: 83px;
  align-self: center;
  justify-content: center;
  padding-top: 8px;
  gap: 31px;
  width: 100%;
  border-top-width: 0.5px;
  border-top-color: ${themes.primary.colors.lightGrey};
`;

export const TabBarButton = styled.TouchableOpacity`
  width: 70px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ isFocused }) =>
    isFocused ? themes.primary.colors.accentColor : 'transparent'};
`;
