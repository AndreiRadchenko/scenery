import React, { useMemo, useRef } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, View } from 'react-native';
import { useSelector } from 'react-redux';

import { CommentCard } from '../../../../components/CommentCard';
import { InputBottomBar } from '../../../../components/InputBottomBar';

import * as Styled from './Comments.styled';
import { selectPostById } from '../../../../redux/posts/posts-selectors';
import { selectUserPostById } from '../../../../redux/userPosts/userPosts-selectors';
import { SCREEN } from '../../../constants';

const isPlatformIOS = Platform.OS === 'ios';

const ImageCard = ({ url }) => {
  return <Styled.ImageCard source={{ uri: url }} />;
};

export const CommentsScreen = ({ navigation, route }) => {
  const flatListRef = useRef(null);
  const {
    post: { image, _id },
    prevScreen,
  } = route.params;

  const items =
    prevScreen === SCREEN.MAIN.POSTS
      ? useSelector(selectPostById(_id))
      : useSelector(selectUserPostById(_id));

  const comments = items?.comments || [];

  const renderComment = ({ item, index }) => {
    return <CommentCard {...item} index={index} />;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={isPlatformIOS ? 'padding' : null}
      keyboardVerticalOffset={isPlatformIOS ? 65 : null}
    >
      <Styled.CommentsContainer>
        <FlatList
          ref={flatListRef}
          data={comments}
          renderItem={renderComment}
          ListHeaderComponent={<ImageCard url={image.url} />}
          contentContainerStyle={{ paddingRight: 16, paddingLeft: 16 }}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{ height: 12 }}
        />
        <InputBottomBar docId={_id} flatListRef={flatListRef} />
      </Styled.CommentsContainer>
    </KeyboardAvoidingView>
  );
};
