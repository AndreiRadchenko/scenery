import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { LogoutSvg } from '../../../../components/MainHeader/LogoutSvg';
import { PostCard } from '../../../../components/PostCard';

import * as Styled from './Profile.styled';
import themes from '../../../../utils/themes';
import { useKeyboardVisible } from '../../../../hooks';

import authors from '../../../../mock/authors.json';
import posts from '../../../../mock/posts.json';
import { SCREEN, STACK } from '../../../constants';

const author = authors[1];

const isPlatformIOS = Platform.OS === 'ios';
const windowWidth = Dimensions.get('window').width;

export const ProfileScreen = ({ navigation, setIsAuth }) => {
  const isKeyboardVisible = useKeyboardVisible();
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

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
    setIsAuth(false);
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
            <Styled.AvatarWrapper windowWidth={windowWidth}>
              <Styled.Avatar source={{ uri: author.avatar.url }} />
              <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
                {author.avatar.url ? <Styled.CrossSign /> : <Styled.PlusSign />}
              </TouchableOpacity>
            </Styled.AvatarWrapper>
            <Styled.LogoutWrapper onPress={handleLogout} isVisible={true}>
              <LogoutSvg color={themes.primary.colors.lightGrey} />
            </Styled.LogoutWrapper>
            <Styled.Title>{author.name}</Styled.Title>
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
