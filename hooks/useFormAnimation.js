import { Animated, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { useKeyboardVisible } from './useKeyboardVisible';

export const useFormAnimation = ({ formOffset, animationDuration }) => {
  const keyboardHeight = useKeyboardVisible();
  const [translateAnim] = useState(new Animated.Value(+0));
  const [translateTo, setTranslateTo] = useState(+0);

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
          Platform.OS === 'ios'
            ? formOffset - keyboardHeight
            : formOffset - keyboardHeight
        )
      : setTranslateTo(+0);
  }, [keyboardHeight]);

  return translateAnim;
};
