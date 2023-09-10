import { styled } from 'styled-components/native';

import themes from '../../utils/themes';

export const TabBar = styled.View`
  position: relative;
  z-index: 10;
  display: flex;
  /* display: ${({ tabIndex }) => (tabIndex !== 1 ? 'flex' : 'none')}; */
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
