import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import { MainButton } from '../../../../components/MainButton';

import * as Styled from './LoginScreen.styled';
import { useKeyboardVisible } from '../../../../hooks';
import { loginValidationSchema } from '../../../../validations/ValidationSchemas';
import { logIn } from '../../../../redux/auth/auth-operations';

const isPlatformIOS = Platform.OS === 'ios';

export const LoginScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [formOffset, setFormOffset] = useState(0);
  const isKeyboardVisible = useKeyboardVisible();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const screenHeight = Dimensions.get('window').height;

  const handleLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setFormOffset(screenHeight - height);
  };

  useEffect(() => {});

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    // validationSchema: isFormSubmitted ? loginValidationSchema : null,
    validationSchema: loginValidationSchema,
    validateOnChange: isFormSubmitted,
    onSubmit: (values, { resetForm }) => {
      console.log('Form values:', values);
      dispatch(logIn(values));
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
          resizeMode="stretch"
          source={require('../../../../assets/img/PhotoBG-compressed.jpg')}
        >
          <KeyboardAvoidingView
            behavior={isPlatformIOS ? 'padding' : ''}
            keyboardVerticalOffset={0}
          >
            <Styled.LoginForm
              formOffset={formOffset}
              onLayout={handleLayout}
              isKeyboardVisible={isKeyboardVisible}
            >
              <Styled.Title>Login</Styled.Title>
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
                  <MainButton buttonText="Login" onPress={handleSubmit} />

                  <Styled.RegisterText
                    onPress={() => navigation.navigate('Registration')}
                  >
                    Don't have account? Register
                  </Styled.RegisterText>
                </>
              )}
            </Styled.LoginForm>
          </KeyboardAvoidingView>
        </Styled.BgImage>
      </Styled.Container>
    </TouchableWithoutFeedback>
  );
};