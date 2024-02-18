import { useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { LogoutSvg } from '../../../../components/MainHeader/LogoutSvg';
import { PostCard } from '../../../../components/PostCard';
import { Avatar } from '../../../../components/Avatar';

import * as Styled from './Profile.styled';
import themes from '../../../../utils/themes';
import { useKeyboardVisible } from '../../../../hooks';

import authors from '../../../../mock/authors.json';
import posts from '../../../../mock/posts.json';
import { SCREEN, STACK } from '../../../constants';
import {
  logOut,
  updateUserDetails,
} from '../../../../redux/auth/auth-operations';
import { selectUser } from '../../../../redux/auth/auth-selector';

// const user = authors[1];

const isPlatformIOS = Platform.OS === 'ios';
const windowWidth = Dimensions.get('window').width;

export const ProfileScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isKeyboardVisible = useKeyboardVisible();
  // const [avatar, setAvatar] = useState(null);
  const user = useSelector(selectUser);

  const openCamera = () => {
    navigation.navigate(SCREEN.MAIN.CAMERA, {
      prevScreen: SCREEN.MAIN.PROFILE,
    });
  };

  const deleteAvatar = () => {
    dispatch(updateUserDetails({ avatar: '', name: user.nickName }));
  };

  useEffect(() => {
    route?.params?.photo &&
      dispatch(
        updateUserDetails({ avatar: route?.params?.photo, name: user.nickName })
      );
  }, [route?.params?.photo]);

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
    dispatch(logOut());
  };

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
              avatarURL={user.avatar}
              onCreateAvatar={openCamera}
              onDeleteAvatar={deleteAvatar}
            />
            <Styled.LogoutWrapper onPress={handleLogout} isVisible={true}>
              <LogoutSvg color={themes.primary.colors.lightGrey} />
            </Styled.LogoutWrapper>
            <Styled.Title>{user.nickName}</Styled.Title>
            <FlatList
              style={{ width: '100%', paddingBottom: 183 }}
              data={posts}
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
            />
          </Styled.ProfileForm>
        </KeyboardAvoidingView>
      </Styled.BgImage>
    </Styled.Container>
  );
};
