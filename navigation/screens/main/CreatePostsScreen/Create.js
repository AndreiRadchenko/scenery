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
  serverTimestamp,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { useDispatch, useSelector } from 'react-redux';

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
import { addPostOperation } from '../../../../redux/posts/posts-operations';
import { selectUser } from '../../../../redux/auth/auth-selector';
import { selectIsLoading } from '../../../../redux/posts/posts-selectors';

import * as Styled from './Create.styled';
import themes from '../../../../utils/themes';
import { useKeyboardVisible } from '../../../../hooks';
import { SCREEN, STACK } from '../../../constants';

const isPlatformIOS = Platform.OS === 'ios';

export const CreateScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [imageName, setImageName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const isLoading = useSelector(selectIsLoading);
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
    // setIsUploading(true);
    // const { photoUrl, uniquePhotoId } = await uploadPhotoToServer();
    // const newPost = doc(postsCollection, uniquePhotoId);
    // const createPost = await setDoc(newPost, {
    //   image: { url: photoUrl },
    //   location,
    //   author: { id, name: nickName },
    //   name: imageName,
    //   timestamp: serverTimestamp(),
    // });
    dispatch(
      addPostOperation({
        photo,
        location,
        author: { id, name: nickName },
        name: imageName,
      })
    );
    // console.log('createPost returns: ', createPost);
    // setIsUploading(false);
    setIsImageSelected(false);
    setPhoto(null);
    setImageName('');
    navigation.goBack();
  };

  const deletePost = () => {
    setIsImageSelected(false);
    setPhoto(null);
    setImageName('');
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
          <Spinner
            visible={isLoading}
            textContent={'Post upload...'}
            textStyle={{ color: 'white' }}
          />
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
                    isImageSelected
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
