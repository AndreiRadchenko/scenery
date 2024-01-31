import { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { PostCard } from '../../../../components/PostCard';

import * as Styled from './Posts.styled';
import authors from '../../../../mock/authors.json';
// import posts from '../../../../mock/posts.json';
import { SCREEN, STACK } from '../../../constants';
import { postsCollection } from '../../../../firebase/config';
import { getPaginatedPosts, getLastItem } from '../../../../firebase/services';
import {
  selectLastVisiblePost,
  selectIsLoading,
  selectIsEndOfPosts,
  selectPosts,
} from '../../../../redux/posts/posts-selectors';
import { fetchPostsOperation } from '../../../../redux/posts/posts-operations';

const author = authors[1];

const UserCard = () => {
  return (
    <Styled.AuthorWrapper>
      <Styled.AuthorAvatar source={{ uri: author.avatar.url }} />
      <Styled.AuthorTextWrapper>
        <Styled.AuthorName>{author.name}</Styled.AuthorName>
        <Styled.AuthorEmail>{author.email} </Styled.AuthorEmail>
      </Styled.AuthorTextWrapper>
    </Styled.AuthorWrapper>
  );
};

export const PostsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const lastVisiblePost = useSelector(selectLastVisiblePost);
  const isEndOfPosts = useSelector(selectIsEndOfPosts);
  const isLoading = useSelector(selectIsLoading);
  const posts = useSelector(selectPosts);

  const fetchMore = async () => {
    dispatch(fetchPostsOperation(4));
  };

  // useEffect(() => {
  //   fetchMore();
  // }, []);

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
        ListHeaderComponent={UserCard}
        keyExtractor={(post) => post._id}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.1}
        onEndReached={fetchMore}
      />
    </Styled.PostsContainer>
  );
};
