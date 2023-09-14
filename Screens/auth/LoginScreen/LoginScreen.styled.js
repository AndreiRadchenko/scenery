import { styled } from 'styled-components/native';
import { ImageBackground, Text } from 'react-native';
import themes from '../../../utils/themes';

export const Container = styled.View`
  flex: 1;
  background-color: ${themes.primary.colors.backgroundColor};
  font-family: ${themes.primary.font.family.robotoRegular};
`;

export const BgImage = styled(ImageBackground)`
  flex: 1;
  justify-content: flex-end;
`;

export const LoginForm = styled.View`
  z-index: 10;
  align-items: center;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding: 32px 16px 0 16px;
  background-color: ${themes.primary.colors.backgroundColor};
  font-size: 16px;
  line-height: 19px;
  padding-bottom: ${({ isKeyboardVisible }) =>
    isKeyboardVisible ? 0 : '132px'};
`;

export const Title = styled.Text`
  font-family: ${themes.primary.font.family.robotoBold};
  font-size: 30px;
  line-height: 35px;
  text-align: center;
  margin-bottom: 33px;
`;

export const InputWrapper = styled.View`
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 72px;
  width: 100%;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  padding: 16px;
  background-color: ${themes.primary.colors.inputBgColor};
  border-width: 1px;
  border-color: ${({ isError }) =>
    isError
      ? themes.primary.colors.accentColor
      : themes.primary.colors.inputBorderColor};
  border-radius: 8px;
`;

export const Error = styled.Text`
  text-align: right;
  font-size: 12px;
  line-height: 12px;
  padding: 4px;
  color: ${themes.primary.colors.accentColor};
`;

export const PasswordWrapper = styled.View`
  width: 100%;
  position: relative;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 72px;
`;

export const ShowPassword = styled.Text`
  position: absolute;
  top: 15px;
  right: 16px;
  color: ${themes.primary.colors.formTextColor};
`;

export const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 343px;
  height: 50px;
  border-radius: 100px;
  background-color: ${themes.primary.colors.accentColor};
  margin-top: 28px;
`;

export const ButtonText = styled.Text`
  color: ${themes.primary.colors.backgroundColor};
`;

export const RegisterText = styled.Text`
  margin-top: 16px;
  color: ${themes.primary.colors.formTextColor};
`;
