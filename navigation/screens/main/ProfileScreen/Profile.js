import { useState, useEffect, useRef } from 'react';
import { KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { LogoutSvg } from '../../../../components/MainHeader/LogoutSvg';
import { PostCard } from '../../../../components/PostCard';
import { Avatar } from '../../../../components/Avatar';
import { NoPermissionView } from '../../../../components/NoPermissionView';

import * as Styled from './Profile.styled';
import themes from '../../../../utils/themes';
import { useKeyboardVisible, usePermissions } from '../../../../hooks';

import { SCREEN, STACK } from '../../../constants';
import { logOut } from '../../../../redux/auth/auth-operations';
import { selectUser } from '../../../../redux/auth/auth-selector';
import { selectUserPosts } from '../../../../redux/userPosts/userPosts-selectors';
import { selectPosts } from '../../../../redux/posts/posts-selectors';
import { fetchUserPostsOperation } from '../../../../redux/userPosts/userPosts-operations';
import { resetUserPostsState } from '../../../../redux/userPosts/userPosts-slice';

const isPlatformIOS = Platform.OS === 'ios';

export const ProfileScreen = ({ navigation, route }) => {
  const flatList = useRef(null);
  const dispatch = useDispatch();
  const isKeyboardVisible = useKeyboardVisible();
  const user = useSelector(selectUser);
  const posts = useSelector(selectPosts);
  const userPosts = useSelector(selectUserPosts);
  const [requiredPermission, setRequiredPermission] = useState('');

  const fetchMore = async () => {
    dispatch(fetchUserPostsOperation({ limits: 10, user }));
  };

  const reloadUserPostsState = async () => {
    dispatch(resetUserPostsState());
  };

  //update userPosts state when new post has been added to the posts state
  useEffect(() => {
    if (posts.length === 0 && userPosts.length !== 0) {
      dispatch(resetUserPostsState());
    }
    if (posts.length !== 0 && userPosts.length === 0) {
      fetchMore();
    }
  }, [posts, userPosts]);

  const {
    cameraPermission,
    mediaLibraryPermission,
    locationPermission,
    permissionsList,
  } = usePermissions();

  const getRequiredPermission = (requiredPermission) => {
    setRequiredPermission(requiredPermission);
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

  if (
    (requiredPermission === 'Camera' && !cameraPermission.granted) ||
    (requiredPermission === 'Media Library' && !mediaLibraryPermission.granted)
  ) {
    return (
      <NoPermissionView
        requiredPermission={requiredPermission}
        permission={permissionsList[requiredPermission].permission}
        requestPermission={permissionsList[requiredPermission].request}
      />
    );
  }
  return (
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
            <Avatar
              user={user}
              getRequiredPermission={getRequiredPermission}
              cameraPermission={cameraPermission}
              mediaLibraryPermission={mediaLibraryPermission}
              locationPermission={locationPermission}
            />
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
                  onCommentPress={() => openComments(item)}
                  onLocationPress={() => openMap(item)}
                  onLikePress={() => {}}
                />
              )}
              keyExtractor={(post) => post._id}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.1}
              onEndReached={fetchMore}
              onRefresh={reloadUserPostsState}
              refreshing={false}
            />
          </Styled.ProfileForm>
        </KeyboardAvoidingView>
      </Styled.BgImage>
    </Styled.Container>
  );
};
