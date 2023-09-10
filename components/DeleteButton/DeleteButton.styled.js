import { styled } from 'styled-components/native';

import themes from '../../utils/themes';

export const DeleteButton = styled.TouchableOpacity`
  width: 70px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ isActive }) =>
    isActive
      ? themes.primary.colors.accentColor
      : themes.primary.colors.inputBgColor};
`;
