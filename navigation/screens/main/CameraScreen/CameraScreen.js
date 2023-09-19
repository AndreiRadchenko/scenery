import { useEffect, useState } from 'react';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { View } from 'react-native';
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import * as Styled from './CameraScreen.styled';

export const CameraScreen = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);

  const takePhoto = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.takePictureAsync();
        setPhoto(photo.uri);
        await MediaLibrary.createAssetAsync(photo.uri);
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
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
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
  return (
    <Camera
      style={{ flex: 1 }}
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
  );
};
