import { styled } from 'styled-components/native';
import { ImageBackground } from 'react-native';
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

export const ProfileForm = styled.View`
  position: relative;
  align-items: center;
  height: 80%;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  margin-top: ${({ isPlatformIOS }) => (isPlatformIOS ? '205px' : '190px')};
  padding: 92px 0 0 0;
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

export const Avatar = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 16px;
`;

export const Title = styled.Text`
  font-family: ${themes.primary.font.family.robotoBold};
  font-size: 30px;
  line-height: 30px;
  text-align: center;
  margin-bottom: 33px;
`;

export const LogoutWrapper = styled.TouchableOpacity`
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  position: absolute;
  right: 16px;
  top: 22px;
`;
