import { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';

import * as Styled from './CommentCard.styled';
import fireStorage from '../../firebase/fireStorage';

export const CommentCard = ({ authorId, text, date, index }) => {
  const [photoURL, setPhotoURL] = useState('');
  const isEvenCard = index % 2 === 0;
  const commentDate = new Date(date);
  const dateFormatted =
    commentDate.toDateString() + ' ' + commentDate.toLocaleTimeString('it-IT');

  useEffect(() => {
    fireStorage
      .getAvatarByUserId(authorId)
      .then((avatar) => setPhotoURL(avatar))
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <Styled.CardContainer isEvenCard={isEvenCard}>
      {!photoURL ? (
        <FontAwesome name="user-circle" size={40} color="gray" />
      ) : (
        <Styled.Avatar source={{ uri: photoURL }} />
      )}
      <Styled.CommentContainer isEvenCard={isEvenCard}>
        <Styled.CommentText>{text}</Styled.CommentText>
        <Styled.CommentDate isEvenCard={isEvenCard}>
          {dateFormatted}
        </Styled.CommentDate>
      </Styled.CommentContainer>
    </Styled.CardContainer>
  );
};
