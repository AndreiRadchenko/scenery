import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { StatusBar } from 'react-native';

import * as Styled from './PhotoPreview.styled';
import { SCREEN, STACK } from '../../navigation/constants';
import { Dimensions } from 'react-native';

export const PhotoPreview = ({ photo, setPhoto, location, navigation }) => {
  const screenHeight = Dimensions.get('window').height;
  const acceptPhoto = () => {
    navigation.navigate(SCREEN.MAIN.CREATE_POST, { photo, location });
  };

  return (
    <Styled.CameraViewContainer>
      <StatusBar
        barStyle="light-content" // Set the text color of the status bar (light or dark)
      />
      <Styled.ImagePreview
        source={{ uri: photo }}
        style={{ resizeMode: 'contain' }}
      />
      <Styled.ControlsWrapper>
        <Styled.BackButton onPress={() => setPhoto(null)}>
          <Ionicons name="ios-close-outline" size={32} color="white" />
        </Styled.BackButton>
        <Styled.AcceptButton onPress={acceptPhoto}>
          <Ionicons name="checkmark-sharp" size={24} color="white" />
        </Styled.AcceptButton>
      </Styled.ControlsWrapper>
    </Styled.CameraViewContainer>
  );
};
