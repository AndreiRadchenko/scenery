import React from 'react';
import { View } from 'react-native';

import { CommentSvg } from './CommentSvg';
import { LocationSvg } from './LocationSvg';
import { LikeSvg } from './LikeSvg';

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
  onCommentPress,
  onLocationPress,
  onLikePress,
}) => {
  return (
    <Styled.PostCard index={index}>
      <Styled.CardImage source={{ uri: image.url }} />
      <Styled.CardName>{name}</Styled.CardName>
      <Styled.ExtDataWrapper>
        <Styled.Achievements>
          <Styled.InfoBlock>
            <CommentSvg
              isEmpty={!comments?.length}
              handlePress={onCommentPress}
            />
            <Styled.CommentNumbers isEmpty={!comments?.length}>
              {comments?.length}
            </Styled.CommentNumbers>
          </Styled.InfoBlock>
          <Styled.InfoBlock>
            <LikeSvg isEmpty={likes == 0} handlePress={onLikePress} />
            <Styled.CommentNumbers isEmpty={likes == 0}>
              {likes}
            </Styled.CommentNumbers>
          </Styled.InfoBlock>
        </Styled.Achievements>
        <Styled.LocationBlock onPress={onLocationPress}>
          <LocationSvg color={themes.primary.colors.lightGrey} />
          <Styled.LocationText>{location.name}</Styled.LocationText>
        </Styled.LocationBlock>
      </Styled.ExtDataWrapper>
    </Styled.PostCard>
  );
};
