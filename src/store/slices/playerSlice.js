import {createSlice} from '@reduxjs/toolkit';
import Sound from 'react-native-sound';

// Hold the Sound instance outside Redux
let soundInstance = null;

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    currentSoundPath: null,
    isPlaying: false,
    isPaused: false,
    playbackPosition: 0,
    duration: 0,
  },
  reducers: {
    setCurrentSound: (state, action) => {
      state.currentSoundPath = action.payload.path;
      state.isPlaying = true;
      state.isPaused = false;
    },
    clearCurrentSound: state => {
      state.currentSoundPath = null;
      state.isPlaying = false;
      state.isPaused = false;
      state.playbackPosition = 0;
      state.duration = 0;
    },
    setPaused: (state, action) => {
      state.isPaused = action.payload;
    },
    setPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setPlaybackPosition: (state, action) => {
      state.playbackPosition = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
  },
});

export const {
  setCurrentSound,
  clearCurrentSound,
  setPaused,
  setPlaying,
  setPlaybackPosition,
  setDuration,
} = playerSlice.actions;

export const playSound = path => dispatch => {
  if (soundInstance) {
    soundInstance.stop().release();
  }

  soundInstance = new Sound(path, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.error('Failed to load sound', error);
      return;
    }

    const duration = soundInstance.getDuration();
    dispatch(setDuration(duration));

    soundInstance.play(() => {
      dispatch(clearCurrentSound());
    });
  });

  dispatch(setCurrentSound({path}));
};

export const stopSound = () => dispatch => {
  if (soundInstance) {
    soundInstance.stop().release();
    soundInstance = null;
  }
  dispatch(clearCurrentSound());
};

// Thunk to rewind the sound by 3 seconds
export const playBack = () => dispatch => {
  if (soundInstance) {
    soundInstance.getCurrentTime(seconds => {
      const newPosition = Math.max(seconds - 3, 0);
      soundInstance.setCurrentTime(newPosition);
    });
  }
};

// Thunk to fast forward the sound by 3 seconds
export const playForward = () => dispatch => {
  if (soundInstance) {
    soundInstance.getCurrentTime(seconds => {
      const duration = soundInstance.getDuration(); // Get duration directly
      const newPosition = Math.min(seconds + 3, duration); // Ensure it doesn’t exceed duration

      soundInstance.setCurrentTime(newPosition); // Set the updated position
    });
  }
};

// Thunk for play/pause functionality
export const togglePlayPause = () => (dispatch, getState) => {
  const {isPlaying, isPaused} = getState().playerSlice;

  if (soundInstance) {
    if (isPlaying && !isPaused) {
      soundInstance.pause();
      dispatch(setPaused(true));
      dispatch(setPlaying(false));
    } else if (isPaused) {
      soundInstance.play(() => {
        dispatch(clearCurrentSound());
      });
      dispatch(setPaused(false));
      dispatch(setPlaying(true));
    }
  }
};

export const seekToPosition = normalizedPosition => dispatch => {
  if (soundInstance) {
    const duration = soundInstance.getDuration();
    const targetPosition = normalizedPosition * duration;

    soundInstance.setCurrentTime(targetPosition);
    dispatch(setPlaybackPosition(normalizedPosition));
  }
};

export const updatePlaybackPosition = () => dispatch => {
  if (soundInstance && soundInstance.isPlaying()) {
    soundInstance.getCurrentTime(seconds => {
      const duration = soundInstance.getDuration();
      const normalizedPosition = seconds / duration;
      dispatch(setPlaybackPosition(normalizedPosition));
    });
  }
};

export default playerSlice.reducer;
