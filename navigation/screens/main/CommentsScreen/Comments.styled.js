import { styled } from 'styled-components/native';

import themes from '../../../../utils/themes';

export const CommentsContainer = styled.View`
  flex: 1;
  padding: 0 16px;
  background-color: ${themes.primary.colors.backgroundColor};
`;

export const ImageCard = styled.Image`
  width: 100%;
  height: 240px;
  border-radius: 8px;
  align-self: center;
  margin-top: 32px;
`;

export const InputBar = styled.View`
  display: flex;
  flex-direction: row;
  align-self: center;
  justify-content: center;
  padding-top: 8px;
  padding-bottom: 16px;
  width: 100%;
`;

export const InputWrapper = styled.View`
  position: relative;
  height: 50px;
  width: 100%;
`;

export const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  padding: 16px;
  background-color: ${themes.primary.colors.inputBgColor};
  border-width: 1px;
  border-color: ${themes.primary.colors.inputBorderColor};
  border-radius: 25px;
`;

export const ArrowButton = styled.TouchableOpacity`
  width: 34px;
  height: 34px;
  border-radius: 17px;
  background: ${themes.primary.colors.accentColor};
  position: absolute;
  right: 8px;
  top: 8px;
`;
