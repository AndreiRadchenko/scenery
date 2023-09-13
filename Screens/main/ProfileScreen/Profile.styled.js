import { styled } from 'styled-components/native';
import { ImageBackground, Text, Image } from 'react-native';
import themes from '../../../utils/themes';

import AddSvg from '../../../assets/svg/add.svg';
import DeleteSvg from '../../../assets/svg/delete.svg';

export const Container = styled.View`
  flex: 1;
  background-color: ${themes.primary.colors.backgroundColor};
  font-family: ${themes.primary.font.family.robotoRegular};
`;

export const BgImage = styled(ImageBackground)`
  flex: 1;
  justify-content: flex-end;
`;

export const ProfileForm = styled.View`
  position: relative;
  align-items: center;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  padding: 92px 16px 0 16px;
  background-color: ${themes.primary.colors.backgroundColor};
  font-size: 16px;
  line-height: 19px;
  padding-bottom: ${({ isKeyboardVisible }) =>
    isKeyboardVisible ? 0 : '78px'};
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

export const CrossSign = styled(DeleteSvg)`
  position: absolute;
  bottom: 9px;
  left: 101px;
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

export const LogoutWrapper = styled.TouchableOpacity`
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  position: absolute;
  right: 16px;
  top: 22px;
`;
