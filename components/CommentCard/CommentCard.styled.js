import { styled } from 'styled-components/native';

import themes from '../../utils/themes';

export const CardContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: ${({ isEvenCard }) => (isEvenCard ? 'row' : 'row-reverse')};
  gap: 16px;
  align-items: flex-start;
  margin-top: 24px;
  margin-bottom: ${({ isLastComment }) => (isLastComment ? '24px' : 0)};
`;

export const Avatar = styled.Image`
  width: 28px;
  height: 28px;
  border-radius: 14px;
`;

export const CommentContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  padding: 16px;
  background: ${themes.primary.colors.commentsBackground};
  border-radius: 6px 6px 6px 6px;
  border-top-left-radius: ${({ isEvenCard }) => (isEvenCard ? '0px' : '6px')};
  border-top-right-radius: ${({ isEvenCard }) => (isEvenCard ? '6px' : '0px')};
`;

export const CommentText = styled.Text`
  text-align: left;
  color: ${themes.primary.colors.text};
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
`;

export const CommentDate = styled.Text`
  color: ${themes.primary.colors.lightGrey};
  text-align: ${({ isEvenCard }) => (isEvenCard ? 'right' : 'left')};
  font-size: 10px;
  font-weight: 400;
  line-height: 10px;
`;
