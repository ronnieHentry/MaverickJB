import { createSlice } from '@reduxjs/toolkit';
import Sound from 'react-native-sound';

// Hold the Sound instance outside Redux
let soundInstance = null;

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    currentSoundPath: null,
    isPlaying: false,
  },
  reducers: {
    setCurrentSound: (state, action) => {
      state.currentSoundPath = action.payload.path;
      state.isPlaying = true;
    },
    clearCurrentSound: (state) => {
      state.currentSoundPath = null;
      state.isPlaying = false;
    },
  },
});

export const { setCurrentSound, clearCurrentSound } = playerSlice.actions;

export const playSound = (path) => (dispatch) => {
  if (soundInstance) {
    soundInstance.stop().release();
  }

  soundInstance = new Sound(path, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.error('Failed to load sound', error);
      return;
    }
    soundInstance.play(() => {
      dispatch(clearCurrentSound());
    });
  });

  dispatch(setCurrentSound({ path }));
};

export const stopSound = () => (dispatch) => {
  if (soundInstance) {
    soundInstance.stop().release();
    soundInstance = null;
  }
  dispatch(clearCurrentSound());
};

// Thunk to rewind the sound by 3 seconds
export const playBack = () => (dispatch) => {
  if (soundInstance) {
    const currentPosition = soundInstance.getCurrentTime((seconds) => {
      const newPosition = Math.max(seconds - 3, 0); // Ensure position doesn't go below 0
      soundInstance.setCurrentTime(newPosition);
    });
  }
};

// Thunk to fast forward the sound by 3 seconds
export const playForward = () => (dispatch) => {
  if (soundInstance) {
    const currentPosition = soundInstance.getCurrentTime((seconds) => {
      soundInstance.getDuration((duration) => {
        const newPosition = Math.min(seconds + 3, duration); // Ensure position doesn't exceed duration
        soundInstance.setCurrentTime(newPosition);
      });
    });
  }
};

export default playerSlice.reducer;
