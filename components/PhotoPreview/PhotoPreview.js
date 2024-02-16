import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar, Alert } from 'react-native';
import * as Location from 'expo-location';
import Spinner from 'react-native-loading-spinner-overlay';

import * as Styled from './PhotoPreview.styled';
import { SCREEN, STACK } from '../../navigation/constants';
import { Dimensions } from 'react-native';
import { acceptPhoto } from '../../helpers/acceptPhoto';

export const PhotoPreview = ({ photo, setPhoto, navigation, isAvatar }) => {
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const screenHeight = Dimensions.get('window').height;

  const handleAccept = async () => {
    setIsLoading(true);
    !isAvatar
      ? await acceptPhoto(hasLocationPermission, photo, navigation)
      : navigation.navigate(SCREEN.AUTH.REGISTRATION, {
          photo,
        });
    setIsLoading(false);
  };

  useEffect(() => {
    !isAvatar &&
      (async () => {
        const { status: locationStatus } =
          await Location.requestForegroundPermissionsAsync();
        setHasLocationPermission(locationStatus === 'granted');
      })();
  }, []);

  return (
    <Styled.CameraViewContainer>
      <Spinner
        visible={isLoading}
        textContent={'Getting location...'}
        textStyle={{ color: 'white' }}
      />
      <StatusBar
        barStyle="light-content" // Set the text color of the status bar (light or dark)
      />
      <Styled.ImagePreview
        source={{ uri: photo }}
        style={{ resizeMode: 'contain' }}
      />
      <Styled.ControlsWrapper>
        <Styled.BackButton onPress={() => setPhoto(null)}>
          <Ionicons name="close-outline" size={32} color="white" />
        </Styled.BackButton>
        <Styled.AcceptButton onPress={handleAccept}>
          <Ionicons name="checkmark-sharp" size={24} color="white" />
        </Styled.AcceptButton>
      </Styled.ControlsWrapper>
    </Styled.CameraViewContainer>
  );
};
