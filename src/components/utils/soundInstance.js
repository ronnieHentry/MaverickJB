import Sound from 'react-native-sound';

let soundInstance = null;

const getSoundInstance = () => soundInstance;

const createSoundInstance = (path, onLoad) => {
  if (soundInstance) {
    soundInstance.stop().release();
    soundInstance = null;
  }

  soundInstance = new Sound(path, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.error('Failed to load the sound', error);
      return;
    }
    onLoad?.(soundInstance);
  });

  return soundInstance;
};

const releaseSoundInstance = () => {
  if (soundInstance) {
    soundInstance.stop().release();
    soundInstance = null;
  }
};

export {getSoundInstance, createSoundInstance, releaseSoundInstance};
