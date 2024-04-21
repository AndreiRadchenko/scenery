import {
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Dimensions,
  Alert,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { MainButton } from '../../../../components/MainButton';
import { PasswordInput } from '../../../../components/PasswordInput';

import * as Styled from './LoginScreen.styled';
import {
  useEmailAnimation,
  useFormAnimation,
  useKeyboardVisible,
} from '../../../../hooks';
import {
  loginValidationSchema,
  emailValidationSchema,
} from '../../../../validations/ValidationSchemas';
import { logIn, resetPassword } from '../../../../redux/auth/auth-operations';
import { selectError } from '../../../../redux/auth/auth-selector';
import { resetAuthError } from '../../../../redux/auth/auth-slice';
import { SCREEN, STACK } from '../../../constants';

const screenHeight = Math.round(Dimensions.get('window').height);
const isPlatformIOS = Platform.OS === 'ios';

export const LoginScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const authError = useSelector(selectError);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const keyboardHeight = useKeyboardVisible();
  const [formHeight, setFormHeight] = useState(0);
  const [isEmailAnimated, setIsEmailAnimated] = useState(false);

  const onFormLayout = (event) => {
    setFormHeight(event.nativeEvent.layout.height);
  };

  const translateAnim = useFormAnimation({
    formHeight: formHeight,
    formDivider: 0.55,
    animationDuration: 190,
  });

  const emailAnimation = useEmailAnimation({ isAnimated: isEmailAnimated });

  useEffect(() => {
    if (authError) {
      Alert.alert('Incorrect credentials', authError, [
        {
          text: 'OK',
          onPress: () => {
            dispatch(resetAuthError());
          },
        },
      ]);
    }
  }, [authError]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    validateOnChange: isFormSubmitted,
    onSubmit: (values, { resetForm }) => {
      dispatch(logIn(values));
      resetForm();
      setIsFormSubmitted(false);
    },
  });

  const handleSubmit = () => {
    setIsFormSubmitted(true);
    formik.handleSubmit();
  };

  const handleResetPassword = async () => {
    try {
      await emailValidationSchema.validate(formik.values);
      dispatch(resetPassword({ email: formik.values.email }));
      formik.resetForm();
    } catch (e) {
      formik.setFieldError('email', e.message);
      setIsEmailAnimated(true);
      setTimeout(() => setIsEmailAnimated(false), 200);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
      style={{ flex: 1 }}
    >
      <Styled.Container>
        <ImageBackground
          resizeMode="stretch"
          source={require('../../../../assets/img/PhotoBG-compressed.jpg')}
          style={{
            minHeight: screenHeight + StatusBar.currentHeight,
            justifyContent: 'flex-end',
          }}
        >
          <Styled.LoginForm
            onLayout={onFormLayout}
            keyboardHeight={keyboardHeight}
            isPlatformIOS={isPlatformIOS}
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
            <Styled.InputWrapper
              style={{
                transform: [{ translateX: emailAnimation }],
              }}
            >
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
              returnKeyType="done"
            />
            <>
              <Styled.ForgotText onPress={handleResetPassword}>
                Forgot password?
              </Styled.ForgotText>
              <MainButton buttonText="Login" onPress={handleSubmit} />
              <Styled.RegisterText
                onPress={() => navigation.navigate(STACK.REGISTRATION)}
              >
                Don't have account? Register
              </Styled.RegisterText>
            </>
          </Styled.LoginForm>
        </ImageBackground>
      </Styled.Container>
    </TouchableWithoutFeedback>
  );
};
