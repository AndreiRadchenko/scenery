import { useEffect, useState } from 'react';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Dimensions, View, StatusBar, Alert } from 'react-native';
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

import { PhotoPreview } from '../../../../components/PhotoPreview';
import { NoPermissionView } from '../../../../components/NoPermissionView';

import * as Styled from './CameraScreen.styled';
import { SCREEN } from '../../../constants';

export const CameraScreen = ({ navigation, route }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);

  const screenWidth = Dimensions.get('window').width;
  const cameraHeight = screenWidth * 1.41;

  const isAvatar = route?.params?.prevScreen === SCREEN.AUTH.REGISTRATION;

  const takePhoto = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.takePictureAsync();
        const resizedPhoto = await manipulateAsync(
          photo.uri,
          [{ resize: { height: photo.height / 3, width: photo.width / 3 } }],
          { compress: 0.5, format: SaveFormat.JPEG }
        );
        setPhoto(resizedPhoto.uri);
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
      await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus === 'granted');
    })();
  }, []);

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <NoPermissionView navigation={navigation} />;
  }
  return photo ? (
    <PhotoPreview
      photo={photo}
      setPhoto={setPhoto}
      navigation={navigation}
      isAvatar={isAvatar}
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
              <Ionicons name="close-outline" size={32} color="white" />
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
