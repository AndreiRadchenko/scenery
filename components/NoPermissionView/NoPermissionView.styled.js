import { styled } from 'styled-components/native';

import themes from '../../utils/themes';

export const CameraViewContainer = styled.View`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const ControlsWrapper = styled.View`
  position: absolute;
  bottom: 80px;
  left: 50%;
  width: 340px;
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

export const NoAccessContainer = styled.View`
  position: absolute;
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
