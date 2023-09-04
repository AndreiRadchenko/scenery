import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

import { PhotoSvg } from './PhotoSvg';
import { LocationSvg } from '../../../components/PostCard';

import * as Styled from './Create.styled';
import themes from '../../../utils/themes';

const isImageSelected = false;
const isPlatformIOS = Platform.OS === 'ios';

export const CreateScreen = () => {
  const headerHeight = useHeaderHeight();
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={isPlatformIOS ? 'padding' : ''}
        enabled
        keyboardVerticalOffset={headerHeight}
      >
        <Styled.PostContainer>
          <Styled.PostCard>
            <Styled.ImageContainer>
              <Styled.CardImage source={{ uri: '' }} />
              <Styled.UploadImageButton
                activeOpacity={0.6}
                isImageSelected={isImageSelected}
              >
                <PhotoSvg isImageSelected={isImageSelected} />
              </Styled.UploadImageButton>
            </Styled.ImageContainer>
            <Styled.CardAction>Upload image</Styled.CardAction>
          </Styled.PostCard>
          <Styled.InputName placeholder="Name..." />
          <Styled.InputWrapper>
            <Styled.InputName placeholder="Location..." />
            <LocationSvg
              color={themes.primary.colors.lightGrey}
              style={{ position: 'absolute', top: '0', left: '0' }}
            />
          </Styled.InputWrapper>
        </Styled.PostContainer>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
