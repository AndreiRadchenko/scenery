import { styled } from 'styled-components/native';

import themes from '../../utils/themes';

export const PostCard = styled.View`
  margin-top: ${({ index }) => (index === 0 ? '32px' : 0)};
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const MenuContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

export const CardImage = styled.Image`
  height: 240px;
  border-radius: 8px;
  width: 100%;
`;

export const CardName = styled.Text`
  color: ${themes.primary.colors.header};
  font-family: ${themes.primary.font.family.robotoBold};
  font-size: 16px;
  font-weight: 500;
`;

export const ExtDataWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Achievements = styled.View`
  display: flex;
  flex-direction: row;
  gap: 24px;
`;

export const InfoBlock = styled.View`
  display: flex;
  flex-direction: row;
  gap: 6px;
  align-items: center;
`;

export const LocationBlock = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  gap: 6px;
  align-items: center;
`;

export const CommentNumbers = styled.Text`
  color: ${({ isEmpty }) =>
    isEmpty ? themes.primary.colors.lightGrey : themes.primary.colors.text};
  font-family: ${themes.primary.font.family.robotoRegular};
  font-size: 16px;
  font-weight: 400;
`;

export const LocationText = styled.Text`
  color: ${themes.primary.colors.text};
  font-family: ${themes.primary.font.family.robotoRegular};
  font-size: 16px;
  font-weight: 400;
  text-decoration-line: underline;
`;
