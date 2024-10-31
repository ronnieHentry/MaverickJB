import {createSlice} from '@reduxjs/toolkit';
import Sound from 'react-native-sound';
import {
  incrementIndex,
  selectCurrentSong,
  setCurrentIndex,
} from '../slices/songsSlice';

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
    title: null,
    artist: null,
    album: null,
    image: null,
    pitch: 0,
  },
  reducers: {
    setCurrentSound: (state, action) => {
      const {path, title, artist, album, image} = action.payload;
      state.currentSoundPath = path;
      state.isPlaying = true;
      state.isPaused = false;
      state.title = title || 'Unknown Title';
      state.artist = artist || 'Unknown Artist';
      state.album = album || 'Unknown Album';
      state.image = image || 'No image';
    },
    clearCurrentSound: state => {
      state.currentSoundPath = null;
      state.isPlaying = false;
      state.isPaused = false;
      state.playbackPosition = 0;
      state.duration = 0;
      state.title = null;
      state.artist = null;
      state.album = null;
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
    increasePitch: state => {
      if (state.pitch < 12) {
        state.pitch += 1;
      }
    },
    decreasePitch: state => {
      if (state.pitch > -12) {
        state.pitch -= 1;
      }
    },
    resetPitch: state => {
      state.pitch = 0;
    },
    setPitch: (state, action) => {
      if (action.payload >= -12 && action.payload <= 12) {
        state.pitch = action.payload; // Set pitch directly
      }
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
  increasePitch,
  decreasePitch,
  resetPitch,
  setPitch,
} = playerSlice.actions;

export const playSound = (song, index) => (dispatch, getState) => {
  if (soundInstance) {
    soundInstance.stop().release();
  }
  const {path, title, artist, album, image} = song;
  soundInstance = new Sound(path, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.error('Failed to load sound', error);
      return;
    }
    const {pitch} = getState().playerSlice;
    soundInstance.setPitch(Math.pow(2, pitch / 12));
    const duration = soundInstance.getDuration();
    dispatch(setDuration(duration));

    soundInstance.play(() => {
      dispatch(playNextSound());
    });
  });

  dispatch(setCurrentSound({path, title, artist, album, image}));
  dispatch(setCurrentIndex(index));
};

export const playNextSound = () => (dispatch, getState) => {
  dispatch(incrementIndex());
  const nextSong = selectCurrentSong(getState());
  if (nextSong) {
    dispatch(playSound(nextSong, getState().songsSlice.currentIndex));
  } else {
    dispatch(clearCurrentSound());
  }
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
      const newPosition = Math.min(seconds + 10, duration); // Ensure it doesn’t exceed duration
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

// Thunk to adjust pitch
export const adjustPitch =
  (increase, reset = false, pitchValue = null) =>
  (dispatch, getState) => {
    if (reset) {
      dispatch(resetPitch());
    } else if (pitchValue !== null) {
      // Set pitch directly based on the slider value
      dispatch(setPitch(pitchValue)); // New action to set pitch directly
    } else if (increase) {
      dispatch(increasePitch());
    } else {
      dispatch(decreasePitch());
    }

    const {pitch} = getState().playerSlice;
    if (soundInstance) {
      soundInstance.setPitch(Math.pow(2, pitch / 12)); // Apply new pitch
    }
  };

export default playerSlice.reducer;
