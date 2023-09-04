import { styled } from 'styled-components/native';

import themes from '../../../utils/themes';

export const PostContainer = styled.View`
  padding: 0 16px 0 16px;
  width: 100%;
  height: 100%;
  background-color: ${themes.primary.colors.backgroundColor};
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
`;

export const CardImage = styled.Image`
  height: 240px;
  border-radius: 8px;
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

export const CardAction = styled.Text`
  color: ${themes.primary.colors.lightGrey};
  font-family: ${themes.primary.font.family.robotoRegular};
  font-size: 16px;
  font-weight: 400;
  line-height: 16px;
`;

export const InputName = styled.TextInput`
  height: 50px;
  width: 100%;
  color: ${themes.primary.colors.text};
  font-family: ${themes.primary.font.family.robotoRegular};
  font-size: 16px;
  font-weight: 500;
  border-bottom-width: 0.5px;
  border-bottom-color: ${themes.primary.colors.lightGrey};
  margin-top: 16px;
`;

export const InputWrapper = styled.View`
  position: relative;
  padding-left: 28px;
`;
