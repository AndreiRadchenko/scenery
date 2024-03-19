import { styled } from 'styled-components/native';
import themes from '../../utils/themes';

export const Container = styled.View`
  gap: 8px;
  padding: 12px;
  margin: 12px;
  background-color: ${themes.primary.colors.inputBgColor};
  border-radius: 12px;
`;
