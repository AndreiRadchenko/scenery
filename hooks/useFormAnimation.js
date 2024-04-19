import { Animated, Platform, Easing } from 'react-native';
import { useState, useEffect } from 'react';
import { useKeyboardVisible } from './useKeyboardVisible';

export const useFormAnimation = ({
  formHeight,
  formDivider,
  animationDuration,
}) => {
  const keyboardHeight = useKeyboardVisible();
  const [translateAnim] = useState(new Animated.Value(+0));
  const [translateTo, setTranslateTo] = useState(+0);

  useEffect(() => {
    Animated.timing(translateAnim, {
      toValue: translateTo,
      duration: animationDuration,
      easing: Easing.bezier(0.17, 0.59, 0.4, 0.77),
      useNativeDriver: true,
    }).start();
  }, [translateTo]);

  useEffect(() => {
    keyboardHeight
      ? setTranslateTo(formHeight - (keyboardHeight + formDivider * formHeight))
      : setTranslateTo(+0);
  }, [keyboardHeight]);

  return translateAnim;
};
