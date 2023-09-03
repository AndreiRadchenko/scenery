import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { useFormik } from 'formik';
import { useState } from 'react';

import * as Styled from './RegistrationScreen.styled';

import { useKeyboardVisible } from '../../../hooks';
import { RegisterValidationSchema } from '../../../validations/ValidationSchemas';

const isPlatformIOS = Platform.OS === 'ios';
const windowWidth = Dimensions.get('window').width;

export const RegistrationScreen = ({ navigation, setIsAuth }) => {
  const isKeyboardVisible = useKeyboardVisible();
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: isFormSubmitted ? RegisterValidationSchema : null,
    onSubmit: (values, { resetForm }) => {
      console.log('Form values:', values);
      setIsAuth(true);
      resetForm();
      setIsFormSubmitted(false);
    },
  });

  const handleSubmit = async () => {
    await setIsFormSubmitted(true);
    formik.handleSubmit();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Styled.Container>
        <Styled.BgImage
          source={require('../../../assets/img/PhotoBG-compressed.jpg')}
        >
          <KeyboardAvoidingView
            behavior={isPlatformIOS ? 'padding' : ''}
            keyboardVerticalOffset={0}
          >
            <Styled.RegisterForm isKeyboardVisible={isKeyboardVisible}>
              <Styled.AvatarWrapper windowWidth={windowWidth}>
                <Styled.PlusSign />
              </Styled.AvatarWrapper>
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
                />
                <Styled.Error>{formik.errors.email}</Styled.Error>
              </Styled.InputWrapper>
              <Styled.PasswordWrapper>
                <Styled.Input
                  isError={formik.errors.password}
                  placeholder="Password"
                  secureTextEntry={isPasswordHidden}
                  value={formik.values.password}
                  onChangeText={formik.handleChange('password')}
                />
                <Styled.Error>{formik.errors.password}</Styled.Error>
                <Styled.ShowPassword
                  onPress={() => setIsPasswordHidden((prevState) => !prevState)}
                >
                  {isPasswordHidden ? 'Show' : 'Hide'}
                </Styled.ShowPassword>
              </Styled.PasswordWrapper>
              {!isKeyboardVisible && (
                <>
                  <Styled.Button activeOpacity={0.8} onPress={handleSubmit}>
                    <Styled.ButtonText>Register</Styled.ButtonText>
                  </Styled.Button>
                  <Styled.RegisterText
                    onPress={() => navigation.navigate('Login')}
                  >
                    Already have account? Login
                  </Styled.RegisterText>
                </>
              )}
            </Styled.RegisterForm>
          </KeyboardAvoidingView>
        </Styled.BgImage>
      </Styled.Container>
    </TouchableWithoutFeedback>
  );
};
