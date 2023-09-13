import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import { LogoutSvg } from '../../../components/MainHeader/LogoutSvg';

import * as Styled from './Profile.styled';
import themes from '../../../utils/themes';
import { useKeyboardVisible } from '../../../hooks';

import authors from '../../../mock/authors.json';
import posts from '../../../mock/posts.json';

const author = authors[1];
const userPosts = [{ _id: '-1' }, ...posts];

const isPlatformIOS = Platform.OS === 'ios';
const windowWidth = Dimensions.get('window').width;

export const ProfileScreen = ({ navigation, setIsAuth }) => {
  const isKeyboardVisible = useKeyboardVisible();
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const handleLogout = () => {
    setIsAuth(false);
  };

  return (
    <Styled.Container>
      <Styled.BgImage
        source={require('../../../assets/img/PhotoBG-compressed.jpg')}
      >
        <KeyboardAvoidingView
          behavior={isPlatformIOS ? 'padding' : ''}
          keyboardVerticalOffset={0}
        >
          <Styled.ProfileForm isKeyboardVisible={isKeyboardVisible}>
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
          </Styled.ProfileForm>
        </KeyboardAvoidingView>
      </Styled.BgImage>
    </Styled.Container>
  );
};
