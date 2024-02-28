import { useState, useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
  Dimensions,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useDispatch, useSelector } from 'react-redux';

import { PhotoSvg } from './PhotoSvg';
import { LocationSvg } from '../../../../components/PostCard/LocationSvg';
import { DeleteButton } from '../../../../components/DeleteButton';
import { MainButton } from '../../../../components/MainButton';
import { NoPermissionView } from '../../../../components/NoPermissionView';

import { addPostOperation } from '../../../../redux/posts/posts-operations';
import { selectUser } from '../../../../redux/auth/auth-selector';

import * as Styled from './Create.styled';
import themes from '../../../../utils/themes';
import {
  useActionSheetMenu,
  usePermissions,
  useImagePickerActions,
} from '../../../../hooks';

export const CreateScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [imageName, setImageName] = useState('');
  const { nickName, id } = useSelector(selectUser);

  const screenHeight = Dimensions.get('window').height - 88;

  const {
    cameraPermission,
    mediaLibraryPermission,
    locationPermission,
    permissionsList,
  } = usePermissions();

  const { takePhoto, pickImage, requiredPermission, isLocationLoading } =
    useImagePickerActions({
      setPhoto,
      setLocation,
      cameraPermission,
      mediaLibraryPermission,
      locationPermission,
    });

  const showActionSheetMenu = useActionSheetMenu(takePhoto, pickImage);

  const onPublish = async () => {
    dispatch(
      addPostOperation({
        photo,
        location,
        author: { id, name: nickName },
        name: imageName,
      })
    );
    setPhoto(null);
    setImageName('');
    navigation.goBack();
  };

  const deletePost = () => {
    setPhoto(null);
    setImageName('');
  };

  if (
    (requiredPermission === 'Camera' && !cameraPermission.granted) ||
    (requiredPermission === 'Location' && !locationPermission.granted) ||
    (requiredPermission === 'Media Library' && !mediaLibraryPermission.granted)
  ) {
    return (
      <NoPermissionView
        requiredPermission={requiredPermission}
        permission={permissionsList[requiredPermission].permission}
        requestPermission={permissionsList[requiredPermission].request}
      />
    );
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={{ flex: 1, position: 'relative' }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
      >
        <Styled.PostContainer>
          <Spinner
            visible={isLocationLoading}
            textContent={'Getting location...'}
            textStyle={{ color: 'white' }}
          />
          <Styled.ScreenWrapper screenHeight={screenHeight}>
            <View>
              <Styled.PostCard>
                <Styled.ImageContainer>
                  <Styled.CardImage
                    source={{ uri: !!photo ? photo : '/' }}
                    style={{ resizeMode: 'cover' }}
                  />
                  <Styled.UploadImageButton
                    activeOpacity={0.6}
                    isImageSelected={!!photo}
                    onPress={showActionSheetMenu}
                  >
                    <PhotoSvg isImageSelected={!!photo} />
                  </Styled.UploadImageButton>
                </Styled.ImageContainer>
                <Styled.CardAction>Take a photo</Styled.CardAction>
              </Styled.PostCard>
              <Styled.InputWrapper>
                <Styled.InputName
                  placeholder="Name..."
                  value={imageName}
                  onChangeText={(value) => setImageName(value)}
                />
              </Styled.InputWrapper>
              <Styled.InputWrapper style={{ marginBottom: 4 }}>
                <LocationSvg color={themes.primary.colors.lightGrey} />
                <Styled.InputName
                  placeholder="Location..."
                  value={
                    !!photo
                      ? !location?.name
                        ? `${location?.latitude}, ${location?.longitude}`
                        : location?.name
                      : ''
                  }
                />
              </Styled.InputWrapper>
              <MainButton
                buttonText="Publish"
                onPress={onPublish}
                isActive={!!photo}
              />
            </View>
            <Styled.DeleteButtonBar>
              <DeleteButton isActive={!!photo} onPress={deletePost} />
            </Styled.DeleteButtonBar>
          </Styled.ScreenWrapper>
        </Styled.PostContainer>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
