import { Animated, Platform } from 'react-native';
import { useState, useEffect } from 'react';
// import { useKeyboardAnimation } from 'react-native-keyboard-controller';
import { useKeyboardVisible } from './useKeyboardVisible';

export const useFormAnimation = ({ formOffset, animationDuration }) => {
  const keyboardHeight = useKeyboardVisible();
  // const { height, progress } = useKeyboardAnimation();
  const [translateAnim] = useState(new Animated.Value(+0));
  const [translateTo, setTranslateTo] = useState(+0);

  // console.log('progress: ', progress);
  // console.log('height: ', height);

  useEffect(() => {
    Animated.timing(translateAnim, {
      toValue: translateTo,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  }, [translateTo]);

  useEffect(() => {
    keyboardHeight
      ? setTranslateTo(
          // formOffset - keyboardHeight,
          Platform.OS === 'ios'
            ? formOffset - keyboardHeight
            : formOffset - keyboardHeight
        )
      : setTranslateTo(+0);
  }, [keyboardHeight]);

  return translateAnim;
};
