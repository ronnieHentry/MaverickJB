import { useRef } from 'react';
import { Animated, PanResponder } from 'react-native';

const useSwipeDownToGoBack = (onSwipeDown, threshold = 100) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const fadeOthers = useRef(new Animated.Value(1)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > 10,

      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          pan.setValue({ x: 0, y: gestureState.dy });
          const fade = 1 - gestureState.dy / threshold;
          fadeOthers.setValue(fade < 0 ? 0 : fade);
        }
      },

      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > threshold) {
          Animated.parallel([
            Animated.timing(pan.y, {
              toValue: 1000,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(fadeOthers, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start(() => {
            onSwipeDown();
            pan.setValue({ x: 0, y: 0 });
            fadeOthers.setValue(1); // reset for when we come back
          });
        } else {
          Animated.parallel([
            Animated.spring(pan, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: true,
            }),
            Animated.timing(fadeOthers, {
              toValue: 1,
              duration: 150,
              useNativeDriver: true,
            }),
          ]).start();
        }
      },
    })
  ).current;

  return { pan, panResponder, fadeOthers };
};

export default useSwipeDownToGoBack;
