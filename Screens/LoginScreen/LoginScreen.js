import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useState } from 'react';
import { useFormik } from 'formik';

import * as Styled from './LoginScreen.styled';

import { useKeyboardVisible } from '../../hooks';
import { loginValidationSchema } from '../../validations/loginValidationSchema';

const isPlatformIOS = Platform.OS === 'ios';

export const LoginScreen = ({ navigation }) => {
  const isKeyboardVisible = useKeyboardVisible();

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      console.log('Form values:', values);
    },
  });

  const handleSubmit = () => {
    console.log('onSubmit');
    console.log('Form errors:', formik.errors);
    formik.handleSubmit();
    formik.resetForm();
    formik.setErrors({});
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Styled.Container>
        <Styled.BgImage
          source={require('../../assets/img/PhotoBG-compressed.jpg')}
        >
          <KeyboardAvoidingView
            behavior={isPlatformIOS ? 'padding' : ''}
            keyboardVerticalOffset={0}
          >
            <Styled.LoginForm isKeyboardVisible={isKeyboardVisible}>
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
                  placeholder="Password"
                  secureTextEntry={isPasswordHidden}
                  value={formik.values.password}
                  onChangeText={formik.handleChange('password')}
                />
                <Styled.ShowPassword
                  onPress={() => setIsPasswordHidden((prevState) => !prevState)}
                >
                  {isPasswordHidden ? 'Show' : 'Hide'}
                </Styled.ShowPassword>
              </Styled.PasswordWrapper>
              {!isKeyboardVisible && (
                <>
                  <Styled.Button activeOpacity={0.8} onPress={handleSubmit}>
                    <Styled.ButtonText>Login</Styled.ButtonText>
                  </Styled.Button>
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
