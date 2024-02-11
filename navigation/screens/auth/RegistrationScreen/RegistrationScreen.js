import { TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { MainButton } from '../../../../components/MainButton';
import { PasswordInput } from '../../../../components/PasswordInput';

import * as Styled from './RegistrationScreen.styled';
import { useFormAnimation } from '../../../../hooks';
import { RegisterValidationSchema } from '../../../../validations/ValidationSchemas';
import { authSignUpUser } from '../../../../redux/auth/auth-operations';
import { register } from '../../../../redux/auth/auth-operations';

const windowWidth = Dimensions.get('window').width;

export const RegistrationScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const translateAnim = useFormAnimation({
    formOffset: 195,
    animationDuration: 200,
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: isFormSubmitted ? RegisterValidationSchema : null,
    onSubmit: (values, { resetForm }) => {
      console.log('Form values:', values);
      dispatch(register(values));
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
            <PasswordInput
              error={formik.errors.password}
              value={formik.values.password}
              onChangeText={formik.handleChange('password')}
            />

            <MainButton buttonText="Register" onPress={handleSubmit} />
            <Styled.RegisterText onPress={() => navigation.navigate('Login')}>
              Already have account? Login
            </Styled.RegisterText>
          </Styled.RegisterForm>
        </Styled.BgImage>
      </Styled.Container>
    </TouchableWithoutFeedback>
  );
};
