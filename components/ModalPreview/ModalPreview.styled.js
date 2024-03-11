import { styled } from 'styled-components/native';
import themes from '../../utils/themes';

export const ViewContainer = styled.View`
  width: 100%;
  height: 100%;
  background: black;
`;

export const ControlsWrapper = styled.View`
  top: 50px;
  flex: 0.8;
  flex-direction: column;
  justify-content: space-between;
  justify-self: center;
`;

export const BackButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  z-index: 5;
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
