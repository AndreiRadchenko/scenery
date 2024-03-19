import { styled } from 'styled-components/native';
import themes from '../../../utils/themes';

export const ItemWrapper = styled.View`
  align-items: flex-start;
`;

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  gap: 16px;
  padding: 4px;
  justify-content: flex-start;
  align-items: center;
`;

export const ItemText = styled.Text`
  font-size: 18px;
  color: ${themes.primary.colors.text};
`;

export const Line = styled.View`
  margin-top: 8px;
  height: 1px;
  width: 99%;
  background-color: ${themes.primary.colors.lightGrey};
  align-self: center;
`;
