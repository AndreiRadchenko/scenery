import { styled } from 'styled-components/native';

import themes from '../../utils/themes';

export const CameraViewContainer = styled.View`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 16px 0 16px;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ControlsWrapper = styled.View`
  position: absolute;
  bottom: 60px;
  left: 50%;
  width: 95%;
  transform: translateX(-170px);
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const BackButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export const ImagePreview = styled.Image`
  width: 100%;
  height: 100%;
  align-self: center;
`;

export const ToolBarContainer = styled.View`
  width: 340px;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AcceptButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${themes.primary.colors.accentColor};
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
`;
