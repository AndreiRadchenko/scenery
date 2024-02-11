import { styled } from 'styled-components/native';
import themes from '../../utils/themes';

export const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  padding: 16px;
  background-color: ${themes.primary.colors.inputBgColor};
  border-width: 1px;
  border-color: ${({ isError }) =>
    isError
      ? themes.primary.colors.accentColor
      : themes.primary.colors.inputBorderColor};
  border-radius: 8px;
`;

export const Error = styled.Text`
  text-align: right;
  font-size: 12px;
  line-height: 12px;
  padding: 4px;
  color: ${themes.primary.colors.accentColor};
`;

export const PasswordWrapper = styled.View`
  width: 100%;
  position: relative;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 72px;
`;

export const ShowPassword = styled.Text`
  position: absolute;
  top: 15px;
  right: 16px;
  color: ${themes.primary.colors.formTextColor};
`;
