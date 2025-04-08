// soundManager.js
import Sound from 'react-native-sound';

let soundInstance = null;

export const getSoundInstance = () => soundInstance;

export const createSoundInstance = (path, onLoad) => {
  if (soundInstance) {
    soundInstance.stop(() => {
      soundInstance.release();
      soundInstance = new Sound(path, Sound.MAIN_BUNDLE, onLoad);
    });
  } else {
    soundInstance = new Sound(path, Sound.MAIN_BUNDLE, onLoad);
  }
};

export const releaseSoundInstance = () => {
  if (soundInstance) {
    soundInstance.stop(() => {
      soundInstance.release();
      soundInstance = null;
    });
  }
};
