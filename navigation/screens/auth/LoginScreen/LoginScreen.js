import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Animated,
} from 'react-native';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import { MainButton } from '../../../../components/MainButton';
import { PasswordInput } from '../../../../components/PasswordInput';

import * as Styled from './LoginScreen.styled';
import { useKeyboardVisible } from '../../../../hooks';
import { loginValidationSchema } from '../../../../validations/ValidationSchemas';
import { logIn } from '../../../../redux/auth/auth-operations';

const isPlatformIOS = Platform.OS === 'ios';

export const LoginScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [formOffset, setFormOffset] = useState(0);
  const keyboardHeight = useKeyboardVisible();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const screenHeight = Dimensions.get('window').height;

  // const handleLayout = (event) => {
  //   const { height } = event.nativeEvent.layout;
  //   setFormOffset(screenHeight - height);
  // };

  const [translateAnim] = useState(new Animated.Value(+0));
  const [translateForm, setTranslateForm] = useState(+0);

  useEffect(() => {
    Animated.timing(translateAnim, {
      toValue: translateForm,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [translateForm]);

  useEffect(() => {
    keyboardHeight
      ? setTranslateForm(250 - keyboardHeight)
      : setTranslateForm(+0);
  }, [keyboardHeight]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    validateOnChange: isFormSubmitted,
    onSubmit: (values, { resetForm }) => {
      console.log('Form values:', values);
      dispatch(logIn(values));
      resetForm();
      setIsFormSubmitted(false);
    },
  });

  const handleSubmit = () => {
    setIsFormSubmitted(true);
    formik.handleSubmit();
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setTranslateForm(0);
      }}
      style={{ flex: 1 }}
    >
      <Styled.Container>
        <Styled.BgImage
          resizeMode="cover"
          source={require('../../../../assets/img/PhotoBG-compressed.jpg')}
        >
          <Styled.LoginForm
            style={{
              transform: [
                { scale: 1 },
                { rotateY: '0deg' },
                { perspective: 100 },
                { translateY: translateAnim },
              ],
            }}
          >
            <Styled.Title>Login</Styled.Title>
            <Styled.InputWrapper>
              <Styled.Input
                isError={formik.errors.email}
                placeholder="Email"
                value={formik.values.email}
                onChangeText={formik.handleChange('email')}
                textContentType="emailAddress"
                keyboardType="email-address"
              />
              <Styled.Error>{formik.errors.email}</Styled.Error>
            </Styled.InputWrapper>
            <PasswordInput
              error={formik.errors.password}
              value={formik.values.password}
              onChangeText={formik.handleChange('password')}
            />
            <>
              <MainButton buttonText="Login" onPress={handleSubmit} />
              <Styled.RegisterText
                onPress={() => navigation.navigate('Registration')}
              >
                Don't have account? Register
              </Styled.RegisterText>
            </>
          </Styled.LoginForm>
        </Styled.BgImage>
      </Styled.Container>
    </TouchableWithoutFeedback>
  );
};
