import { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';

import { PostCard } from '../../../../components/PostCard';

import * as Styled from './Posts.styled';
import themes from '../../../../utils/themes';
import authors from '../../../../mock/authors.json';
// import posts from '../../../../mock/posts.json';
import { SCREEN, STACK } from '../../../constants';
import {
  selectLastVisiblePost,
  selectIsLoading,
  selectIsEndOfPosts,
  selectPosts,
} from '../../../../redux/posts/posts-selectors';
import {
  selectUser,
  selectIsLoading as selectIsUserLoading,
} from '../../../../redux/auth/auth-selector';
import { fetchPostsOperation } from '../../../../redux/posts/posts-operations';

// const user = authors[1];

const UserCard = ({ user, isUserLoading }) => {
  return (
    !isUserLoading && (
      <Styled.AuthorWrapper>
        <Styled.ImageWrapper>
          {user.avatar ? (
            <Styled.AuthorAvatar source={{ uri: user.avatar }} />
          ) : (
            <FontAwesome
              name="user-circle"
              size={54}
              color={themes.primary.colors.lightGrey}
            />
          )}
        </Styled.ImageWrapper>
        <Styled.AuthorTextWrapper>
          <Styled.AuthorName>{user.nickName}</Styled.AuthorName>
          <Styled.AuthorEmail>{user.email} </Styled.AuthorEmail>
        </Styled.AuthorTextWrapper>
      </Styled.AuthorWrapper>
    )
  );
};

export const PostsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const lastVisiblePost = useSelector(selectLastVisiblePost);
  const isEndOfPosts = useSelector(selectIsEndOfPosts);
  const isLoading = useSelector(selectIsLoading);
  const posts = useSelector(selectPosts);
  const user = useSelector(selectUser);
  const isUserLoading = useSelector(selectIsUserLoading);

  const fetchMore = async () => {
    dispatch(fetchPostsOperation(4));
  };

  const openComments = (item) => {
    navigation.navigate(STACK.HOME, {
      screen: SCREEN.MAIN.COMMENTS,
      params: {
        post: item,
        prevScreen: SCREEN.MAIN.POSTS,
      },
    });
  };

  const openMap = (item) => {
    navigation.navigate(STACK.HOME, {
      screen: SCREEN.MAIN.MAP,
      params: {
        post: item,
        prevScreen: SCREEN.MAIN.POSTS,
      },
    });
  };

  return (
    <Styled.PostsContainer>
      <FlatList
        data={posts}
        renderItem={({ item, index }) => (
          <PostCard
            {...item}
            index={index}
            onCommentPress={() => openComments(item)}
            onLocationPress={() => openMap(item)}
          />
        )}
        ListHeaderComponent={UserCard({ user, isUserLoading })}
        keyExtractor={(post) => post._id}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.1}
        onEndReached={fetchMore}
      />
    </Styled.PostsContainer>
  );
};
