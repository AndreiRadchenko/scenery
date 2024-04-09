import {
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Dimensions,
  Alert,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { MainButton } from '../../../../components/MainButton';
import { PasswordInput } from '../../../../components/PasswordInput';

import * as Styled from './LoginScreen.styled';
import { useFormAnimation, useKeyboardVisible } from '../../../../hooks';
import { loginValidationSchema } from '../../../../validations/ValidationSchemas';
import { logIn } from '../../../../redux/auth/auth-operations';
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

  const translateAnim = useFormAnimation({
    formOffset: isPlatformIOS ? 250 : 260,
    animationDuration: Platform.OS === 'ios' ? 200 : 200,
  });

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

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <Styled.Container>
        <Styled.BgImage
          resizeMode="cover"
          source={require('../../../../assets/img/PhotoBG-compressed.jpg')}
          style={{ minHeight: Math.round(Dimensions.get('window').height) }}
        >
          <Styled.LoginForm
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
              returnKeyType="done"
            />
            <>
              <MainButton buttonText="Login" onPress={handleSubmit} />
              <Styled.RegisterText
                onPress={() => navigation.navigate(STACK.REGISTRATION)}
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
