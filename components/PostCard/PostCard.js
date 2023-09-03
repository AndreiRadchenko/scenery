import React from 'react';

import { CommentSvg, LocationSvg } from '.';

import * as Styled from './PostCard.styled';
import themes from '../../utils/themes';

export const PostCard = ({
  _id,
  image,
  name,
  location,
  likes,
  comments,
  author,
  index,
}) => {
  return (
    <Styled.PostCard index={index}>
      <Styled.CardImage source={{ uri: image.url }} />
      <Styled.CardName>{name}</Styled.CardName>
      <Styled.ExtDataWrapper>
        <Styled.InfoBlock>
          <CommentSvg isEmpty={!comments.length} />
          <Styled.CommentNumbers isEmpty={!comments.length}>
            {comments.length}
          </Styled.CommentNumbers>
        </Styled.InfoBlock>
        <Styled.InfoBlock>
          <LocationSvg color={themes.primary.colors.lightGrey} />
          <Styled.LocationText>{location}</Styled.LocationText>
        </Styled.InfoBlock>
      </Styled.ExtDataWrapper>
    </Styled.PostCard>
  );
};
