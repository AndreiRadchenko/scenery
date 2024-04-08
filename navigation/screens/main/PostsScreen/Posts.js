import { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';

import { PostCard } from '../../../../components/PostCard';
import { ModalPreview } from '../../../../components/ModalPreview';

import * as Styled from './Posts.styled';
import themes from '../../../../utils/themes';
import { SCREEN, STACK } from '../../../constants';
import { selectPosts } from '../../../../redux/posts/posts-selectors';
import {
  selectUser,
  selectIsLoading as selectIsUserLoading,
} from '../../../../redux/auth/auth-selector';
import {
  fetchPostsOperation,
  updatePostOperation,
} from '../../../../redux/posts/posts-operations';
import { resetPostsState } from '../../../../redux/posts/posts-slice';

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
  const posts = useSelector(selectPosts);
  const user = useSelector(selectUser);
  const isUserLoading = useSelector(selectIsUserLoading);
  const [modalVisible, setModalVisible] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);

  const fetchMore = async () => {
    dispatch(fetchPostsOperation(10));
  };

  const reloadPostsState = () => {
    dispatch(resetPostsState());
  };

  const openPreview = (item) => {
    setPreviewItem(item);
    setModalVisible(true);
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

  const onLikePress = (post) => {
    const isPostLiked = post.likes?.includes(user.id);
    dispatch(
      updatePostOperation({
        docId: post._id,
        userId: user.id,
        isPostLiked,
      })
    );
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
    <>
      <ModalPreview
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        item={previewItem}
      />
      <Styled.PostsContainer>
        <FlatList
          data={posts}
          renderItem={({ item, index }) => (
            <PostCard
              {...item}
              user={user}
              index={index}
              screen={SCREEN.MAIN.POSTS}
              onCommentPress={() => openComments(item)}
              onLocationPress={() => openMap(item)}
              onLikePress={() => onLikePress(item)}
              openPreview={() => openPreview(item)}
            />
          )}
          ListHeaderComponent={UserCard({ user, isUserLoading })}
          keyExtractor={(post) => post._id}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}
          onEndReachedThreshold={0.1}
          onEndReached={fetchMore}
          onRefresh={reloadPostsState}
          refreshing={false}
        />
      </Styled.PostsContainer>
    </>
  );
};
