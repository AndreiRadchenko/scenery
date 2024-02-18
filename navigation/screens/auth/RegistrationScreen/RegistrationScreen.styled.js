import { styled } from 'styled-components/native';
import { ImageBackground, Text, Animated } from 'react-native';
import themes from '../../../../utils/themes';

import AddSvg from '../../../../assets/svg/add.svg';

export const Container = styled.View`
  flex: 1;
  background-color: ${themes.primary.colors.backgroundColor};
  font-family: ${themes.primary.font.family.robotoRegular};
`;

export const BgImage = styled(ImageBackground)`
  flex: 1;
  justify-content: flex-end;
`;

export const RegisterForm = styled(Animated.View)`
  position: relative;
  align-items: center;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding: 92px 16px 78px 16px;
  background-color: ${themes.primary.colors.backgroundColor};
  font-size: 16px;
  line-height: 19px;
`;

export const AvatarWrapper = styled.View`
  position: absolute;
  top: -60px;
  left: ${({ windowWidth }) => windowWidth / 2 - 60}px;
  width: 120px;
  height: 120px;
  background-color: ${themes.primary.colors.inputBgColor};
  border-radius: 16px;
`;

export const ImageWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 16px;
`;

export const PlusSign = styled(AddSvg)`
  position: absolute;
  bottom: 14px;
  left: 107px;
  width: 25px;
  height: 25px;
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
  position: relative;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 72px;
  width: 100%;
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
