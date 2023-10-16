import { useState, useEffect } from 'react';
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { StatusBar, Alert } from 'react-native';
import * as Location from 'expo-location';
import Spinner from 'react-native-loading-spinner-overlay';

import * as Styled from './PhotoPreview.styled';
import { SCREEN, STACK } from '../../navigation/constants';
import { Dimensions } from 'react-native';
import locationService from '../../services/LocationNameService';

export const PhotoPreview = ({ photo, setPhoto, navigation }) => {
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const screenHeight = Dimensions.get('window').height;
  const acceptPhoto = async () => {
    try {
      if (hasLocationPermission) {
        console.log('start get location');
        setIsLoading(true);
        const location = await Location.getCurrentPositionAsync();
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        console.log('coords: ', coords);
        const { address } = await locationService.getLocationName(coords);
        console.log('address: ', address);
        const { country, city, town, state, district } = address;
        navigation.navigate(SCREEN.MAIN.CREATE_POST, {
          photo,
          location: {
            ...coords,
            name: country
              ? `${town || city || district || state || ''}, ${country}`
              : '',
          },
        });
        setIsLoading(false);
      } else {
        navigation.navigate(SCREEN.MAIN.CREATE_POST, {
          photo,
          location: { name: 'Unknown location' },
        });
      }
    } catch (e) {
      console.log(e.message);
      Alert.alert('Alert', "Can't get location name");
    }
  };

  useEffect(() => {
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
          <Ionicons name="ios-close-outline" size={32} color="white" />
        </Styled.BackButton>
        <Styled.AcceptButton onPress={acceptPhoto}>
          <Ionicons name="checkmark-sharp" size={24} color="white" />
        </Styled.AcceptButton>
      </Styled.ControlsWrapper>
    </Styled.CameraViewContainer>
  );
};
