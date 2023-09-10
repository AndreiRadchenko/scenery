import { styled } from 'styled-components/native';
import themes from '../../utils/themes';

export const Button = styled.TouchableOpacity`
  align-self: center;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  border-radius: 100px;
  background-color: ${({ isActive }) =>
    isActive
      ? themes.primary.colors.accentColor
      : themes.primary.colors.inputBgColor};
  margin-top: 28px;
`;

export const ButtonText = styled.Text`
  color: ${({ isActive }) =>
    isActive
      ? themes.primary.colors.backgroundColor
      : themes.primary.colors.lightGrey};
`;
