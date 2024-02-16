import { styled } from 'styled-components/native';

import themes from '../../../utils/themes';

export const BackgroundWrapper = styled.View`
  position: absolute;
  bottom: 14px;
  left: 107px;
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
  background-color: ${themes.primary.colors.lightGrey};
`;

export const AvatarChangeButton = styled.TouchableOpacity``;
