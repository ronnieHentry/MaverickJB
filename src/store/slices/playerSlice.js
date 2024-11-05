import {createSlice} from '@reduxjs/toolkit';
import Sound from 'react-native-sound';
import {
  incrementIndex,
  selectCurrentSong,
  setCurrentIndex,
} from '../slices/songsSlice';
import {getPitchMultiplier} from '../../components/utils/helper';

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
    pitch: 1,
    speed: 1,
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
    setPitch: (state, action) => {
      state.pitch = action.payload;
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

export const playForward = () => dispatch => {
  if (soundInstance) {
    soundInstance.getCurrentTime(seconds => {
      const duration = soundInstance.getDuration();
      const newPosition = Math.min(seconds + 10, duration);
      soundInstance.setCurrentTime(newPosition);
    });
  }
};

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

const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

export const adjustPitch =
  (pitchChange = 0, reset = false) =>
  (dispatch, getState) => {
    let newPitch = 1;

    if (reset) {
      newPitch = 0; // Reset pitch in semitones to zero
    } else {
      const {pitch} = getState().playerSlice;
      newPitch = pitch + pitchChange;

      // Clamp newPitch between -12 and 12 to limit to one octave up/down
      newPitch = clamp(newPitch, -12, 12);
    }

    // Dispatch the clamped pitch value in semitones to Redux state
    dispatch(setPitch(newPitch));

    if (soundInstance) {
      // Calculate the pitch multiplier based on semitone changes
      const pitchMultiplier = getPitchMultiplier(newPitch);
      soundInstance.setPitch(pitchMultiplier);
    }
  };

export default playerSlice.reducer;
