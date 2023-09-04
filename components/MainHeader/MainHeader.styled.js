import { styled } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import themes from '../../utils/themes';

export const HeaderContainer = styled.View`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
  padding-bottom: 10px;
  height: 88px;
  width: 100%;
  border-bottom-width: 0.5px;
  border-bottom-color: ${themes.primary.colors.lightGrey};
  background-color: ${themes.primary.colors.backgroundColor};
`;

export const HeaderTitle = styled.Text`
  color: ${themes.primary.colors.header};
  text-align: center;
  font-family: ${themes.primary.font.family.robotoBold};
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 129.412% */
  letter-spacing: -0.408px;
`;

export const LogoutWrapper = styled(TouchableOpacity)`
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  position: absolute;
  right: 16px;
  bottom: 10px;
`;

export const BackButtonWrapper = styled(TouchableOpacity)`
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  position: absolute;
  left: 16px;
  bottom: 10px;
`;
