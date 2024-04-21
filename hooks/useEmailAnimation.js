import { Animated, Platform, Easing } from 'react-native';
import { useState, useEffect } from 'react';

export const useEmailAnimation = ({ isAnimated }) => {
  const [translateAnim] = useState(new Animated.Value(+0));

  useEffect(() => {
    if (isAnimated) {
      translateAnim.setValue(10);
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.elastic(4),
        useNativeDriver: true,
      }).start();
    }
  }, [isAnimated]);

  return translateAnim;
};
