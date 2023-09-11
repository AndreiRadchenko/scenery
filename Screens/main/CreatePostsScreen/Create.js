import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
  Dimensions,
} from 'react-native';

import { PhotoSvg } from './PhotoSvg';
import { LocationSvg } from '../../../components/PostCard/LocationSvg';
import { DeleteButton } from '../../../components/DeleteButton';

import * as Styled from './Create.styled';
import themes from '../../../utils/themes';
import { useKeyboardVisible } from '../../../hooks';
import { MainButton } from '../../../components/MainButton';

const isImageSelected = false;
const isPlatformIOS = Platform.OS === 'ios';

export const CreateScreen = () => {
  const keyboardHeight = useKeyboardVisible();
  const screenHeight = Dimensions.get('window').height - 88;
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={{ flex: 1, position: 'relative' }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      >
        <Styled.PostContainer>
          <Styled.ScreenWrapper screenHeight={screenHeight}>
            <View>
              <Styled.PostCard>
                <Styled.ImageContainer>
                  <Styled.CardImage source={{ uri: '/' }} />
                  <Styled.UploadImageButton
                    activeOpacity={0.6}
                    isImageSelected={isImageSelected}
                  >
                    <PhotoSvg isImageSelected={isImageSelected} />
                  </Styled.UploadImageButton>
                </Styled.ImageContainer>
                <Styled.CardAction>Upload image</Styled.CardAction>
              </Styled.PostCard>
              <Styled.InputWrapper>
                <Styled.InputName placeholder="Name..." />
              </Styled.InputWrapper>
              <Styled.InputWrapper style={{ marginBottom: 4 }}>
                <LocationSvg color={themes.primary.colors.lightGrey} />
                <Styled.InputName placeholder="Location..." />
              </Styled.InputWrapper>
              {!keyboardHeight && (
                <MainButton
                  buttonText="Publish"
                  onPress={() => {}}
                  isActive={isImageSelected}
                />
              )}
            </View>
            <Styled.DeleteButtonBar>
              <DeleteButton isActive={isImageSelected} onPress={() => {}} />
            </Styled.DeleteButtonBar>
          </Styled.ScreenWrapper>
        </Styled.PostContainer>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
