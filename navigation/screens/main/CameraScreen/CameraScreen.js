import { useEffect, useState } from 'react';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Dimensions, View, StatusBar } from 'react-native';
import * as Location from 'expo-location';
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import { PhotoPreview } from '../../../../components/PhotoPreview/PhotoPreview';

import * as Styled from './CameraScreen.styled';

export const CameraScreen = ({ navigation, route }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState({
    name: '',
    latitude: '',
    longitude: '',
  });

  const screenWidth = Dimensions.get('window').width;
  const cameraHeight = screenWidth * 1.41;

  const takePhoto = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.takePictureAsync();
        setPhoto(photo.uri);
        // await MediaLibrary.createAssetAsync(photo.uri);
        if (hasLocationPermission) {
          const location = await Location.getCurrentPositionAsync();
          const coords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };
          setLocation({ name: '', ...coords });
        }
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  const toggleCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();
      const { status: locationStatus } =
        await Location.requestForegroundPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus === 'granted');
      setHasLocationPermission(locationStatus === 'granted');
    })();
  }, []);

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return (
      <Styled.CameraViewContainer>
        <Styled.ControlsWrapper>
          <Styled.BackButton onPress={() => navigation.goBack()}>
            <Ionicons name="ios-close-outline" size={32} color="gray" />
          </Styled.BackButton>
          <Styled.NoAccessContainer>
            <Styled.NoAccessText>No access to camera</Styled.NoAccessText>
          </Styled.NoAccessContainer>
        </Styled.ControlsWrapper>
      </Styled.CameraViewContainer>
    );
  }
  return photo ? (
    <PhotoPreview
      photo={photo}
      setPhoto={setPhoto}
      location={location}
      setLocation={setLocation}
      navigation={navigation}
    />
  ) : (
    <Styled.CameraContainer cameraHeight={cameraHeight}>
      <StatusBar
        barStyle="light-content" // Set the text color of the status bar (light or dark)
      />
      <Camera
        style={{ height: cameraHeight, borderRadius: 8 }}
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        <Styled.CameraViewContainer>
          <Styled.ControlsWrapper>
            <Styled.BackButton onPress={() => navigation.goBack()}>
              <Ionicons name="ios-close-outline" size={32} color="white" />
            </Styled.BackButton>
            <Styled.ToolBarContainer>
              <Styled.ImageButton>
                <FontAwesome name="photo" size={38} color="white" />
              </Styled.ImageButton>
              <Styled.ShootButton onPress={takePhoto}>
                <MaterialCommunityIcons
                  name="circle-slice-8"
                  size={96}
                  color="white"
                />
              </Styled.ShootButton>
              <Styled.ImageButton onPress={toggleCamera}>
                <Ionicons name="sync" size={38} color="white" />
              </Styled.ImageButton>
            </Styled.ToolBarContainer>
          </Styled.ControlsWrapper>
        </Styled.CameraViewContainer>
      </Camera>
    </Styled.CameraContainer>
  );
};
