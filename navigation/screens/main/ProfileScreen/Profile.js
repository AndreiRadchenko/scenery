import { useState, useEffect, useRef } from 'react';
import { KeyboardAvoidingView, Platform, FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { LogoutSvg } from '../../../../components/MainHeader/LogoutSvg';
import { PostCard } from '../../../../components/PostCard';
import { Avatar } from '../../../../components/Avatar';
import { ModalPreview } from '../../../../components/ModalPreview';

import * as Styled from './Profile.styled';
import themes from '../../../../utils/themes';
import { useKeyboardVisible } from '../../../../hooks';

import { SCREEN, STACK } from '../../../constants';
import { logOut } from '../../../../redux/auth/auth-operations';
import { selectUser } from '../../../../redux/auth/auth-selector';
import { selectUserPosts } from '../../../../redux/userPosts/userPosts-selectors';
import { selectPosts } from '../../../../redux/posts/posts-selectors';
import { fetchUserPostsOperation } from '../../../../redux/userPosts/userPosts-operations';
import { updatePostOperation } from '../../../../redux/posts/posts-operations';
import {
  resetUserPostsState,
  userPostsUpdateComments,
} from '../../../../redux/userPosts/userPosts-slice';

const isPlatformIOS = Platform.OS === 'ios';

export const ProfileScreen = ({ navigation, route }) => {
  const flatList = useRef(null);
  const dispatch = useDispatch();
  const isKeyboardVisible = useKeyboardVisible();
  const user = useSelector(selectUser);
  const posts = useSelector(selectPosts);
  const userPosts = useSelector(selectUserPosts);
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);

  const fetchMore = async () => {
    await dispatch(fetchUserPostsOperation({ limits: 10, user }));
  };

  const appendPosts = () => {
    if (userPosts.length >= 10) {
      fetchMore();
    }
  };

  const reloadUserPostsState = async () => {
    await dispatch(resetUserPostsState());
  };

  //update userPosts state when new post has been added to the posts state
  useEffect(() => {
    if (posts.length === 0) {
      reloadUserPostsState();
    }
  }, [posts]);

  useEffect(() => {
    if (userPosts.length === 0) {
      fetchMore();
    }
  }, [userPosts]);

  const openPreview = (item) => {
    setPreviewItem(item);
    setIsPreviewModalVisible(true);
  };

  const openComments = (item) => {
    navigation.navigate(STACK.PROFILE, {
      screen: SCREEN.MAIN.COMMENTS,
      params: {
        post: item,
        prevScreen: SCREEN.MAIN.PROFILE,
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
    navigation.navigate(STACK.PROFILE, {
      screen: SCREEN.MAIN.MAP,
      params: {
        post: item,
        prevScreen: SCREEN.MAIN.PROFILE,
      },
    });
  };

  const handleLogout = () => {
    dispatch(resetUserPostsState());
    dispatch(logOut());
  };

  return (
    <>
      <ModalPreview
        modalVisible={isPreviewModalVisible}
        setModalVisible={setIsPreviewModalVisible}
        item={previewItem}
      />
      <Styled.Container>
        <Styled.BgImage
          resizeMode="stretch"
          source={require('../../../../assets/img/PhotoBG-compressed.jpg')}
        >
          <KeyboardAvoidingView
            behavior={isPlatformIOS ? 'padding' : ''}
            keyboardVerticalOffset={0}
          >
            <Styled.ProfileForm
              isKeyboardVisible={isKeyboardVisible}
              isPlatformIOS={isPlatformIOS}
            >
              <Avatar user={user} />
              <Styled.LogoutWrapper onPress={handleLogout} isVisible={true}>
                <LogoutSvg color={themes.primary.colors.lightGrey} />
              </Styled.LogoutWrapper>
              <Styled.Title>{user.nickName}</Styled.Title>
              <FlatList
                ref={flatList}
                style={{ width: '100%', paddingBottom: 183 }}
                data={userPosts}
                renderItem={({ item, index }) => (
                  <PostCard
                    {...item}
                    index={index}
                    user={user}
                    onCommentPress={() => openComments(item)}
                    onLocationPress={() => openMap(item)}
                    onLikePress={() => onLikePress(item)}
                    openPreview={() => openPreview(item)}
                  />
                )}
                ListFooterComponent={<View />}
                ListFooterComponentStyle={{ height: 40 }}
                keyExtractor={(post) => post._id}
                showsVerticalScrollIndicator={true}
                contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}
                onEndReachedThreshold={0.1}
                onEndReached={appendPosts}
                onRefresh={reloadUserPostsState}
                refreshing={false}
              />
            </Styled.ProfileForm>
          </KeyboardAvoidingView>
        </Styled.BgImage>
      </Styled.Container>
    </>
  );
};
