import {
  Text,
  ImageBackground,
  Animated,
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Easing,
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';

import { cssVar } from '../../utils/cssVar';
import * as Styled from './LoginScreen.styled';

import { useKeyboardVisible } from '../../hooks';
import { loginValidationSchema } from '../../validations/loginValidationSchema';

const isPlatformIOS = Platform.OS === 'ios';
const initialState = {
  email: '',
  password: '',
};

export const LoginScreen = ({ navigation }) => {
  const isKeyboardVisible = useKeyboardVisible();
  const [isFocusOnForm, setIsFocusOnForm] = useState(false);
  const [formPosition, setFormPosition] = useState(0);

  const formTranslateAnimation = useRef(new Animated.Value(78)).current;

  useEffect(() => {
    Animated.timing(formTranslateAnimation, {
      toValue: formPosition,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  }, [formPosition]);

  const moveUp = () => {
    setFormPosition(178);
    setIsFocusOnForm(true);
  };
  const moveDown = () => {
    setFormPosition(0);
    setIsFocusOnForm(false);
  };

  const [credentials, setCredentials] = useState(initialState);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const handleSubmit = (values) => {
    console.log(values);
    setCredentials(initialState);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: handleSubmit,
  });

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
            <Styled.LoginForm
              isKeyboardVisible={isKeyboardVisible}
              style={
                {
                  // transform: [{ translateY: formTranslateAnimation }],
                  // transform: [{ translateY: isKeyboardVisible ? 78 : 0 }],
                }
              }
              onFocus={moveUp}
              onBlur={moveDown}
            >
              <Text style={styles.form__title}>Login</Text>
              <TextInput
                style={styles.form__input}
                placeholder="Email"
                value={credentials.email}
                onChangeText={(value) =>
                  setCredentials((prevState) => ({
                    ...prevState,
                    email: value,
                  }))
                }
              />
              <View style={styles.form__password__wrap}>
                <TextInput
                  style={styles.form__input}
                  placeholder="Password"
                  secureTextEntry={isPasswordHidden}
                  value={credentials.password}
                  onChangeText={(value) =>
                    setCredentials((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                />
                <Text
                  style={styles.form__input__show}
                  onPress={() => setIsPasswordHidden((prevState) => !prevState)}
                >
                  {isPasswordHidden ? 'Show' : 'Hide'}
                </Text>
              </View>
              {!isKeyboardVisible && (
                <>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.form__button}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.form__button__text}>Login</Text>
                  </TouchableOpacity>
                  <Text
                    style={styles.form__register__text}
                    onPress={() => navigation.navigate('Registration')}
                  >
                    Don't have account? Register
                  </Text>
                </>
              )}
            </Styled.LoginForm>
          </KeyboardAvoidingView>
        </Styled.BgImage>
      </Styled.Container>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: cssVar.backgroundColor,
  //   fontFamily: 'Roboto-Regular',
  // },
  // backgroundImg: {
  //   flex: 1,
  //   justifyContent: 'flex-end',
  // },
  form: {
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: cssVar.backgroundColor,
    // fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
  },
  form__title: {
    fontFamily: 'Roboto-Bold',
    // fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    marginBottom: 33,
  },
  form__input: {
    width: 343,
    height: 50,
    padding: 16,
    backgroundColor: cssVar.inputBgColor,
    borderWidth: 1,
    borderColor: cssVar.inputBorderColor,
    borderRadius: 8,
    marginBottom: 15,
  },
  form__password__wrap: {
    position: 'relative',
  },
  form__input__show: {
    position: 'absolute',
    top: 15,
    right: 16,
    color: cssVar.formTextColor,
  },
  form__button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 343,
    height: 50,
    borderRadius: 100,
    backgroundColor: cssVar.accentColor,
    marginTop: 28,
  },
  form__button__text: {
    color: cssVar.backgroundColor,
  },
  form__register__text: {
    marginTop: 16,
    color: cssVar.formTextColor,
  },
});
