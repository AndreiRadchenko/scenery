import { styled } from 'styled-components/native';
import { Camera } from 'expo-camera';

import themes from '../../../../utils/themes';

export const PostContainer = styled.ScrollView`
  padding: 0 16px 0 16px;
  width: 100%;
  height: 100%;
  background-color: ${themes.primary.colors.backgroundColor};
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const ScreenWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${({ screenHeight }) => `${screenHeight}px`};
`;

export const PostCard = styled.View`
  margin-top: 32px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ImageContainer = styled.View`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
`;

export const CardImage = styled.Image`
  height: 240px;
  width: 100%;
  background-color: ${themes.primary.colors.inputBgColor};
`;

export const UploadImageButton = styled.TouchableOpacity`
  position: absolute;
  background-color: ${({ isImageSelected }) =>
    !isImageSelected
      ? themes.primary.colors.backgroundColor
      : themes.primary.colors.transparentButton};
  border-radius: 30px;
  top: 50%;
  left: 50%;
  width: 60px;
  height: 60px;
  transform: translateY(-30px) translateX(-30px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NoAccessContainer = styled.View`
  position: absolute;
  /* background-color: ${themes.primary.colors.backgroundColor}; */
  border-radius: 30px;
  top: 50%;
  left: 50%;
  width: 240px;
  height: 60px;
  transform: translateY(-30px) translateX(-120px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NoAccessText = styled.Text`
  color: ${themes.primary.colors.lightGrey};
  font-family: ${themes.primary.font.family.robotoRegular};
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
`;

export const CardAction = styled.Text`
  color: ${themes.primary.colors.lightGrey};
  font-family: ${themes.primary.font.family.robotoRegular};
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
`;

export const InputWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  border-bottom-width: 0.5px;
  border-bottom-color: ${themes.primary.colors.lightGrey};
  margin-top: 16px;
`;

export const InputName = styled.TextInput`
  height: 50px;
  width: 100%;
  color: ${themes.primary.colors.text};
  font-family: ${themes.primary.font.family.robotoRegular};
  font-size: 16px;
  font-weight: 500;
`;

export const DeleteButtonBar = styled.View`
  display: flex;
  flex-direction: row;
  height: 83px;
  align-self: center;
  justify-content: center;
  margin-top: 30px;
  width: 100%;
`;
