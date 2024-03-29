import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { MainButton } from '../../../../components/MainButton';
import { PasswordInput } from '../../../../components/PasswordInput';
import { AvatarRegistration } from '../../../../components/Avatar';
import { ModalPermission } from '../../../../components/ModalPermission';

import * as Styled from './RegistrationScreen.styled';
import {
  useFormAnimation,
  useActionSheetMenu,
  usePermissions,
  useImagePickerActions,
} from '../../../../hooks';
import { RegisterValidationSchema } from '../../../../validations/ValidationSchemas';
import { register } from '../../../../redux/auth/auth-operations';

export const RegistrationScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    cameraPermission,
    mediaLibraryPermission,
    locationPermission,
    permissionsList,
  } = usePermissions();

  const { takePhoto, pickImage, requiredPermission, setRequiredPermission } =
    useImagePickerActions({
      setPhoto: setAvatar,
      cameraPermission,
      mediaLibraryPermission,
      locationPermission,
    });

  const showActionSheetMenu = useActionSheetMenu(takePhoto, pickImage);

  useEffect(() => {
    if (
      (requiredPermission === 'Camera' && !cameraPermission?.granted) ||
      (requiredPermission === 'Media Library' &&
        !mediaLibraryPermission?.granted)
    ) {
      setIsModalVisible(true);
    }
  }, [requiredPermission, cameraPermission, mediaLibraryPermission]);

  const translateAnim = useFormAnimation({
    formOffset: 195,
    animationDuration: 200,
  });

  const formik = useFormik({
    initialValues: {
      avatar: null,
      name: '',
      email: '',
      password: '',
    },
    validationSchema: isFormSubmitted ? RegisterValidationSchema : null,
    onSubmit: async (values, { resetForm }) => {
      dispatch(register(values));
      resetForm();
      setIsFormSubmitted(false);
    },
  });

  const handleSubmit = async () => {
    await formik.setFieldValue('avatar', avatar);
    setIsFormSubmitted(true);
    formik.handleSubmit();
  };

  return (
    <>
      <ModalPermission
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        requiredPermission={requiredPermission}
        setRequiredPermission={setRequiredPermission}
        permission={permissionsList[requiredPermission]?.permission}
        requestPermission={permissionsList[requiredPermission]?.request}
      />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Styled.Container>
          <Styled.BgImage
            resizeMode="stretch"
            source={require('../../../../assets/img/PhotoBG-compressed.jpg')}
          >
            <Styled.RegisterForm
              style={{
                transform: [
                  { scale: 1 },
                  { rotateY: '0deg' },
                  { perspective: 100 },
                  { translateY: translateAnim },
                ],
              }}
            >
              <AvatarRegistration
                avatarURL={avatar}
                onCreateAvatar={showActionSheetMenu}
                onDeleteAvatar={() => setAvatar(null)}
              />
              <Styled.Title>Register</Styled.Title>
              <Styled.InputWrapper>
                <Styled.Input
                  isError={formik.errors.name}
                  placeholder="Name"
                  value={formik.values.name}
                  onChangeText={formik.handleChange('name')}
                />
                <Styled.Error>{formik.errors.name}</Styled.Error>
              </Styled.InputWrapper>
              <Styled.InputWrapper>
                <Styled.Input
                  isError={formik.errors.email}
                  placeholder="Email"
                  value={formik.values.email}
                  onChangeText={formik.handleChange('email')}
                  keyboardType="email-address"
                />
                <Styled.Error>{formik.errors.email}</Styled.Error>
              </Styled.InputWrapper>
              <PasswordInput
                error={formik.errors.password}
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                returnKeyType="done"
              />

              <MainButton buttonText="Register" onPress={handleSubmit} />
              <Styled.RegisterText onPress={() => navigation.navigate('Login')}>
                Already have account? Login
              </Styled.RegisterText>
            </Styled.RegisterForm>
          </Styled.BgImage>
        </Styled.Container>
      </TouchableWithoutFeedback>
    </>
  );
};
