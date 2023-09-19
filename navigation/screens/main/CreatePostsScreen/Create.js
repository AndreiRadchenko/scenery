import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
  Dimensions,
} from 'react-native';

import { PhotoSvg } from './PhotoSvg';
import { LocationSvg } from '../../../../components/PostCard/LocationSvg';
import { DeleteButton } from '../../../../components/DeleteButton';
import { MainButton } from '../../../../components/MainButton';

import * as Styled from './Create.styled';
import themes from '../../../../utils/themes';
import { useKeyboardVisible } from '../../../../hooks';
import { SCREEN, STACK } from '../../../constants';

const isImageSelected = false;
const isPlatformIOS = Platform.OS === 'ios';

export const CreateScreen = ({ navigation, route }) => {
  const keyboardHeight = useKeyboardVisible();
  const screenHeight = Dimensions.get('window').height - 88;

  const openCamera = () => {
    navigation.navigate(SCREEN.MAIN.CAMERA);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <>
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
                      onPress={openCamera}
                    >
                      <PhotoSvg isImageSelected={isImageSelected} />
                    </Styled.UploadImageButton>
                  </Styled.ImageContainer>
                  <Styled.CardAction>Take a photo</Styled.CardAction>
                </Styled.PostCard>
                <Styled.InputWrapper>
                  <Styled.InputName placeholder="Name..." />
                </Styled.InputWrapper>
                <Styled.InputWrapper style={{ marginBottom: 4 }}>
                  <LocationSvg color={themes.primary.colors.lightGrey} />
                  <Styled.InputName placeholder="Location..." />
                </Styled.InputWrapper>
                <MainButton
                  buttonText="Publish"
                  onPress={() => {}}
                  isActive={isImageSelected}
                />
              </View>
              <Styled.DeleteButtonBar>
                <DeleteButton isActive={isImageSelected} onPress={() => {}} />
              </Styled.DeleteButtonBar>
            </Styled.ScreenWrapper>
          </Styled.PostContainer>
        </KeyboardAvoidingView>
      </>
    </TouchableWithoutFeedback>
  );
};
