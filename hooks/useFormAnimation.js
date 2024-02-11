import { Animated } from 'react-native';
import { useState, useEffect } from 'react';

import { useKeyboardVisible } from '.';

const isPlatformIOS = Platform.OS === 'ios';

export const useFormAnimation = ({ formOffset, animationDuration }) => {
  const keyboardHeight = useKeyboardVisible();
  const [translateAnim] = useState(new Animated.Value(+0));
  const [translateTo, setTranslateTo] = useState(+0);

  console.log('keyboardHeight: ', keyboardHeight);

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
          isPlatformIOS
            ? formOffset - keyboardHeight
            : formOffset - keyboardHeight
        )
      : setTranslateTo(+0);
  }, [keyboardHeight]);

  return translateAnim;
};
