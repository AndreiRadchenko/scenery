import { styled } from 'styled-components/native';
import { ImageBackground, Animated } from 'react-native';
import themes from '../../utils/themes';

export const Container = styled.View`
  flex: 1;
  background-color: ${themes.primary.colors.backgroundColor};
  font-family: ${themes.primary.font.family.robotoRegular};
`;

export const BgImage = styled(ImageBackground)`
  flex: 1;
  justify-content: flex-end;
`;

export const LoginForm = styled(Animated.View)`
  align-items: center;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding: 32px 16px 0 16px;
  background-color: ${themes.primary.colors.backgroundColor};
  font-size: 16px;
  line-height: 19px;
  padding-bottom: 78px;
  /* padding-bottom: ${({ isKeyboardVisible }) =>
    isKeyboardVisible ? 0 : '78px'}; */
`;
