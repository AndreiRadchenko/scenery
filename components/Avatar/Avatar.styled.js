import styled from 'styled-components';
import themes from '../../utils/themes';

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
