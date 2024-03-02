import {
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Dimensions,
} from 'react-native';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import { MainButton } from '../../../../components/MainButton';
import { PasswordInput } from '../../../../components/PasswordInput';

import * as Styled from './LoginScreen.styled';
import { useFormAnimation } from '../../../../hooks';
import { loginValidationSchema } from '../../../../validations/ValidationSchemas';
import { logIn } from '../../../../redux/auth/auth-operations';
import { SCREEN, STACK } from '../../../constants';

export const LoginScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const screenHeight = Dimensions.get('window').height;

  const translateAnim = useFormAnimation({
    formOffset: 250,
    animationDuration: Platform.OS === 'ios' ? 200 : 200,
  });

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
      style={{
        flex: 1,
        minHeight: Math.round(Dimensions.get('window').height),
      }}
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
