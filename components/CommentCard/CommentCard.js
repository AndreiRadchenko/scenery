import { View, Text, FlatList } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import * as Styled from './CommentCard.styled';

export const CommentCard = ({ avatar, text, date, index, isLastComment }) => {
  const isEvenCard = index % 2 === 0;
  return (
    <Styled.CardContainer isEvenCard={isEvenCard} isLastComment={isLastComment}>
      {!avatar.url ? (
        <FontAwesome5 name="user-circle" size={28} color="gray" />
      ) : (
        <Styled.Avatar source={{ uri: avatar.url }} />
      )}
      <Styled.CommentContainer isEvenCard={isEvenCard}>
        <Styled.CommentText>{text}</Styled.CommentText>
        <Styled.CommentDate isEvenCard={isEvenCard}>{date}</Styled.CommentDate>
      </Styled.CommentContainer>
    </Styled.CardContainer>
  );
};
