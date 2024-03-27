import { useState } from 'react';
import { Platform } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import * as Styled from './InputBottomBar.styled';
import { useKeyboardVisible, useFormAnimation } from '../../hooks';

const isPlatformIOS = Platform.OS === 'ios';

export const InputBottomBar = ({ color = '#fff', style }) => {
  const keyboardHeight = useKeyboardVisible();

  const translateAnim = useFormAnimation({
    formOffset: 270,
    animationDuration: 200,
  });

  const formik = useFormik({
    initialValues: {
      authorId: '',
      text: '',
      date: '',
    },
    onSubmit: (values, { resetForm }) => {
      // dispatch(logIn(values));
      console.log('values: ', values);
      resetForm();
    },
  });

  return (
    <Styled.InputBar
      isPlatformIOS={isPlatformIOS}
      keyboardHeight={keyboardHeight}
      // style={{
      //   transform: [
      //     { scale: 1 },
      //     { rotateY: '0deg' },
      //     { perspective: 100 },
      //     { translateY: translateAnim },
      //   ],
      // }}
    >
      <Styled.InputWrapper>
        <Styled.Input
          placeholder="Comment..."
          value={formik.values.text}
          onChangeText={formik.handleChange('text')}
        ></Styled.Input>
        <Styled.ArrowButton activeOpacity={0.8} onPress={formik.handleSubmit}>
          <Svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <Path
              d="M17 10L17.3536 9.64645C17.1583 9.45118 16.8417 9.45118 16.6464 9.64645L17 10ZM21.6464 15.3536C21.8417 15.5488 22.1583 15.5488 22.3536 15.3536C22.5488 15.1583 22.5488 14.8417 22.3536 14.6464L21.6464 15.3536ZM11.6464 14.6464C11.4512 14.8417 11.4512 15.1583 11.6464 15.3536C11.8417 15.5488 12.1583 15.5488 12.3536 15.3536L11.6464 14.6464ZM16.5 24C16.5 24.2761 16.7239 24.5 17 24.5C17.2761 24.5 17.5 24.2761 17.5 24H16.5ZM16.6464 10.3536L21.6464 15.3536L22.3536 14.6464L17.3536 9.64645L16.6464 10.3536ZM16.6464 9.64645L11.6464 14.6464L12.3536 15.3536L17.3536 10.3536L16.6464 9.64645ZM16.5 10V17H17.5V10H16.5ZM16.5 17V24H17.5V17H16.5Z"
              fill="white"
            />
          </Svg>
        </Styled.ArrowButton>
      </Styled.InputWrapper>
    </Styled.InputBar>
  );
};
