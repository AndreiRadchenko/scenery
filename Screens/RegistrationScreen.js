import {
  Text,
  ImageBackground,
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { cssVar } from '../utils/cssVar';
import { useState, useEffect } from 'react';
import { useKeyboardVisible } from '../hooks';
import AddSvg from '../assets/svg/add.svg';

const isPlatformIOS = Platform.OS === 'ios';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const initialState = {
  name: '',
  email: '',
  password: '',
};

export const RegistrationScreen = ({ navigation }) => {
  const isKeyboardVisible = useKeyboardVisible();
  const [credentials, setCredentials] = useState(initialState);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const onSubmit = () => {
    console.log(credentials);
    setCredentials(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/img/PhotoBG-compressed.jpg')}
          style={styles.backgroundImg}
        >
          <KeyboardAvoidingView
            behavior={isPlatformIOS ? 'padding' : ''}
            keyboardVerticalOffset={0}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isKeyboardVisible ? 0 : 78,
              }}
            >
              <View style={styles.form__avatar}>
                <AddSvg width={25} height={25} style={styles.form__avatar__add} />
              </View>
              <Text style={styles.form__title}>Register</Text>
              <TextInput
                style={styles.form__input}
                placeholder="Name"
                value={credentials.name}
                onChangeText={value => setCredentials(prevState => ({ ...prevState, name: value }))}
              />
              <TextInput
                style={styles.form__input}
                placeholder="Email"
                value={credentials.email}
                onChangeText={value =>
                  setCredentials(prevState => ({ ...prevState, email: value }))
                }
              />
              <View
                style={{
                  ...styles.form__password__wrap,
                  marginBottom: isKeyboardVisible ? 0 : 28,
                }}
              >
                <TextInput
                  style={styles.form__input}
                  placeholder="Password"
                  secureTextEntry={isPasswordHidden}
                  value={credentials.password}
                  onChangeText={value =>
                    setCredentials(prevState => ({ ...prevState, password: value }))
                  }
                />
                <Text
                  style={styles.form__input__show}
                  onPress={() => setIsPasswordHidden(prevState => !prevState)}
                >
                  {isPasswordHidden ? 'Show' : 'Hide'}
                </Text>
              </View>
              {!isKeyboardVisible && (
                <>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.form__button}
                    onPress={onSubmit}
                  >
                    <Text style={styles.form__button__text}>Register</Text>
                  </TouchableOpacity>
                  <Text
                    style={styles.form__register__text}
                    onPress={() => navigation.navigate('Login')}
                  >
                    Already have account? Login
                  </Text>
                </>
              )}
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cssVar.backgroundColor,
    fontFamily: 'Roboto-Regular',
  },
  backgroundImg: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  form: {
    // flex: 0.6,
    // height: 549,
    position: 'relative',
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 92,
    // paddingBottom: 78,
    backgroundColor: cssVar.backgroundColor,
    // fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
  },
  form__avatar: {
    position: 'absolute',
    top: -60,
    left: windowWidth / 2 - 60,
    width: 120,
    height: 120,
    backgroundColor: cssVar.inputBgColor,
    borderRadius: 16,
  },
  form__avatar__add: {
    position: 'absolute',
    bottom: 14,
    left: 107,
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
    // marginBottom: 28,
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
    // marginTop: 28,
  },
  form__button__text: {
    color: cssVar.backgroundColor,
  },
  form__register__text: {
    marginTop: 16,
    color: cssVar.formTextColor,
    // marginBottom: 78,
  },
});
