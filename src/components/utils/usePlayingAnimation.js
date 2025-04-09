// usePlayingAnimation.js
import {useEffect, useRef} from 'react';
import {Animated} from 'react-native';

export const usePlayingAnimation = isPlaying => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let animationLoop;

    if (isPlaying) {
      animationLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.05,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      );
      animationLoop.start();
    } else {
      scaleAnim.stopAnimation();
      scaleAnim.setValue(1);
    }

    return () => {
      if (animationLoop) animationLoop.stop();
    };
  }, [isPlaying]);

  return {scaleAnim};
};
