import {useEffect, useRef, useState} from 'react';
import {Animated, Easing} from 'react-native';

const useAnimation = (toggle: boolean, duration?: number) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: +toggle,
      duration: duration || 240,
      easing: Easing.in(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [toggle]);

  const interpolate = (outputRange: number[]) =>
    animation.interpolate({inputRange: [0, 1], outputRange});

  return {
    interpolate,
  };
};

export default useAnimation;
