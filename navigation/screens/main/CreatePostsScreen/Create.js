import { useState, useEffect } from 'react';
import uuid from 'react-native-uuid';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
  Dimensions,
} from 'react-native';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useSelector } from 'react-redux';

import { PhotoSvg } from './PhotoSvg';
import { LocationSvg } from '../../../../components/PostCard/LocationSvg';
import { DeleteButton } from '../../../../components/DeleteButton';
import { MainButton } from '../../../../components/MainButton';
import {
  storage,
  db,
  postsCollection,
  imagesStorage,
} from '../../../../firebase/config';

import * as Styled from './Create.styled';
import themes from '../../../../utils/themes';
import { useKeyboardVisible } from '../../../../hooks';
import { SCREEN, STACK } from '../../../constants';
import { selectUser } from '../../../../redux/auth/auth-selector';

const isPlatformIOS = Platform.OS === 'ios';

export const CreateScreen = ({ navigation, route }) => {
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const keyboardHeight = useKeyboardVisible();
  const screenHeight = Dimensions.get('window').height - 88;

  const { nickName, id } = useSelector(selectUser);

  const openCamera = () => {
    navigation.navigate(SCREEN.MAIN.CAMERA);
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();

    const uniquePhotoId = uuid.v4();
    const newImageRef = ref(imagesStorage, uniquePhotoId);
    await uploadBytes(newImageRef, file);

    const photoUrl = await getDownloadURL(newImageRef);

    return { photoUrl, uniquePhotoId };
  };

  const onPublish = async () => {
    const { photoUrl, uniquePhotoId } = await uploadPhotoToServer();
    const newPost = doc(postsCollection, uniquePhotoId);
    const createPost = await setDoc(newPost, {
      image: { url: photoUrl },
      location,
      author: { id, name: nickName },
    });
    setIsImageSelected(false);
    setPhoto(null);
    navigation.goBack();
  };

  const deletePost = () => {
    setIsImageSelected(false);
    setPhoto(null);
  };

  useEffect(() => {
    const photo = route?.params?.photo;
    const location = route?.params?.location;
    setIsImageSelected(!!photo);
    setPhoto(photo);
    setLocation(location);
  }, [route]);

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
                  <Styled.CardImage
                    source={{ uri: isImageSelected ? photo : '/' }}
                    style={{ resizeMode: 'cover' }}
                  />
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
                <Styled.InputName
                  placeholder="Location..."
                  value={
                    isImageSelected
                      ? `${location?.latitude}, ${location?.longitude}`
                      : ''
                  }
                />
              </Styled.InputWrapper>
              <MainButton
                buttonText="Publish"
                onPress={onPublish}
                isActive={isImageSelected}
              />
            </View>
            <Styled.DeleteButtonBar>
              <DeleteButton isActive={isImageSelected} onPress={deletePost} />
            </Styled.DeleteButtonBar>
          </Styled.ScreenWrapper>
        </Styled.PostContainer>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
