import React, { useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { CommentSvg } from './CommentSvg';
import { LocationSvg } from './LocationSvg';
import { LikeSvg } from './LikeSvg';
import { ModalBottomMenu } from '../ModalBottomMenu';

import * as Styled from './PostCard.styled';
import themes from '../../utils/themes';

export const PostCard = ({
  _id,
  screen,
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
  openPreview,
}) => {
  const bottomSheetRef = useRef(null);

  const openModalMenu = () => bottomSheetRef.current?.present();

  return (
    <>
      <ModalBottomMenu
        ref={bottomSheetRef}
        screen={screen}
        id={_id}
        image={image}
        author={author}
      />
      <Styled.PostCard index={index}>
        <Styled.MenuContainer>
          <TouchableOpacity activeOpacity={0.8} onPress={openModalMenu}>
            <MaterialIcons
              name="more-horiz"
              size={24}
              color={themes.primary.colors.lightGrey}
            />
          </TouchableOpacity>
        </Styled.MenuContainer>
        <TouchableOpacity activeOpacity={0.8} onPress={openPreview}>
          <Styled.CardImage source={{ uri: image.url }} />
        </TouchableOpacity>
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
            <Styled.LocationText>{location?.name}</Styled.LocationText>
          </Styled.LocationBlock>
        </Styled.ExtDataWrapper>
      </Styled.PostCard>
    </>
  );
};
