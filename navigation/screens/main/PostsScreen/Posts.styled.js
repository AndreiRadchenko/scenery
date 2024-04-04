import { styled } from 'styled-components/native';

import themes from '../../../../utils/themes';

export const PostsContainer = styled.View`
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: ${themes.primary.colors.backgroundColor};
`;

export const AuthorWrapper = styled.View`
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: flex-start;
  align-items: center;
  padding-top: 32px;
`;

export const ImageWrapper = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  /* flex: 1; */
  justify-content: center;
  align-items: center;
`;

export const AuthorAvatar = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 16px;
`;

export const AuthorTextWrapper = styled.View``;

export const AuthorName = styled.Text`
  color: ${themes.primary.colors.header};
  font-family: ${themes.primary.font.family.robotoBold};
  font-size: 13px;
  font-weight: 700;
  line-height: 13px;
`;

export const AuthorEmail = styled.Text`
  color: ${themes.primary.colors.iconInactive};
  font-family: ${themes.primary.font.family.robotoRegular};
  font-size: 11px;
  font-weight: 400;
  line-height: 11px;
`;
