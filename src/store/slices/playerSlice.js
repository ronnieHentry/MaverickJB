import {createSlice} from '@reduxjs/toolkit';
import {
  createSoundInstance,
  getSoundInstance,
  releaseSoundInstance,
} from '../../components/utils/soundInstance';
import {incrementIndex, selectCurrentSong, setCurrentIndex} from './songsSlice';
import {clamp, getPitchMultiplier} from '../../components/utils/helper';
import { resetAbRepeat } from './abRepeatControls';

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
    abRepeat: {
      pointA: null,
      pointB: null,
      isActive: false,
    },
    pitch: 0,
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
    setPointA: (state, action) => {
      state.abRepeat.pointA = action.payload;
      state.abRepeat.isActive = false;
    },
    setPointB: (state, action) => {
      state.abRepeat.pointB = action.payload;
      state.abRepeat.isActive = true;
    },
    clearAbRepeat: state => {
      state.abRepeat = {pointA: null, pointB: null, isActive: false};
    },
    setPitch: (state, action) => {
      state.pitch = action.payload;
    },
    setSpeed: (state, action) => {
      state.speed = action.payload;
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
  setPointA,
  setPointB,
  clearAbRepeat,
  setPitch,
  setSpeed,
} = playerSlice.actions;

export const playSound = (song, index) => (dispatch, getState) => {
  resetAbRepeat(dispatch);
  releaseSoundInstance();

  const {path, title, artist, album, image} = song;

  createSoundInstance(path, sound => {
    const {pitch} = getState().playerSlice;
    sound.setPitch(Math.pow(2, pitch / 12));
    const duration = sound.getDuration();
    dispatch(setDuration(duration));
    sound.play(() => dispatch(playNextSound()));
  });

  dispatch(setCurrentSound({path, title, artist, album, image}));
  dispatch(setCurrentIndex(index));
};

export const playNextSound = () => (dispatch, getState) => {
  resetAbRepeat(dispatch);
  dispatch(incrementIndex());

  const updatedState = getState();
  const nextSong = selectCurrentSong(updatedState);

  if (nextSong) {
    dispatch(playSound(nextSong, updatedState.songsSlice.currentIndex));
  } else {
    dispatch(clearCurrentSound());
  }
};

export const stopSound = () => dispatch => {
  releaseSoundInstance();
  dispatch(clearCurrentSound());
  resetAbRepeat(dispatch);
};

export const playBack = () => dispatch => {
  resetAbRepeat(dispatch);
  const sound = getSoundInstance();
  if (sound) {
    sound.getCurrentTime(seconds => {
      const newPosition = Math.max(seconds - 3, 0);
      sound.setCurrentTime(newPosition);
    });
  }
};

export const playForward = () => dispatch => {
  resetAbRepeat(dispatch);
  const sound = getSoundInstance();
  if (sound) {
    sound.getCurrentTime(seconds => {
      const duration = sound.getDuration();
      const newPosition = Math.min(seconds + 10, duration);
      sound.setCurrentTime(newPosition);
    });
  }
};

export const togglePlayPause = () => (dispatch, getState) => {
  const {isPlaying, isPaused} = getState().playerSlice;
  const sound = getSoundInstance();

  if (sound) {
    if (isPlaying && !isPaused) {
      sound.pause();
      dispatch(setPaused(true));
      dispatch(setPlaying(false));
    } else if (isPaused) {
      sound.play(() => dispatch(clearCurrentSound()));
      dispatch(setPaused(false));
      dispatch(setPlaying(true));
    }
  }
};

export const seekToPosition = normalizedPosition => dispatch => {
  const sound = getSoundInstance();
  if (sound) {
    const duration = sound.getDuration();
    const targetPosition = normalizedPosition * duration;
    sound.setCurrentTime(targetPosition);
    dispatch(setPlaybackPosition(normalizedPosition));
  }
};

export const updatePlaybackPosition = () => dispatch => {
  const sound = getSoundInstance();
  if (sound) {
    sound.getCurrentTime(seconds => {
      const duration = sound.getDuration();
      const normalizedPosition = seconds / duration;
      dispatch(setPlaybackPosition(normalizedPosition));
    });
  }
};

export const adjustPitch =
  (pitchChange = 0, reset = false) =>
  (dispatch, getState) => {
    let newPitch = reset
      ? 0
      : clamp(getState().playerSlice.pitch + pitchChange, -12, 12);
    dispatch(setPitch(newPitch));

    const sound = getSoundInstance();
    if (sound) {
      const pitchMultiplier = getPitchMultiplier(newPitch);
      sound.setPitch(pitchMultiplier);
    }
  };

export const adjustSpeed =
  (speedChange = 0, reset = false) =>
  (dispatch, getState) => {
    let newSpeed = reset
      ? 1
      : clamp(getState().playerSlice.speed + speedChange, 0.25, 5.0);
    dispatch(setSpeed(newSpeed));

    const sound = getSoundInstance();
    if (sound) {
      sound.setSpeed(newSpeed);
    }
  };

export default playerSlice.reducer;
