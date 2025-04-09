import {createSlice} from '@reduxjs/toolkit';

import {
  handlePlaySound,
  handlePlayNext,
  handleStopSound,
  handlePlayBack,
  handlePlayForward,
  handleTogglePlayPause,
  handleSeekToPosition,
  handleUpdatePlaybackPosition,
  handleAdjustPitch,
  handleAdjustSpeed,
  handlePlayPrevious,
} from '../../components/utils/playerSliceUtils';

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

export const playSound = (song, index) => (dispatch, getState) =>
  handlePlaySound(dispatch, getState, song, index);

export const playNextSound = () => (dispatch, getState) =>
  handlePlayNext(dispatch, getState);

export const playPreviousSound = () => (dispatch, getState) =>
  handlePlayPrevious(dispatch, getState);

export const stopSound = () => dispatch => handleStopSound(dispatch);

export const playForward = () => dispatch => {
  handlePlayForward(dispatch);
};

export const playBack = () => dispatch => {
  handlePlayBack(dispatch);
};

export const togglePlayPause = () => (dispatch, getState) =>
  handleTogglePlayPause(dispatch, getState);

export const seekToPosition = normalizedPosition => dispatch =>
  handleSeekToPosition(dispatch, normalizedPosition);

export const updatePlaybackPosition = () => dispatch =>
  handleUpdatePlaybackPosition(dispatch);

export const adjustPitch =
  (pitchChange = 0, reset = false) =>
  (dispatch, getState) =>
    handleAdjustPitch(dispatch, getState, pitchChange, reset);

export const adjustSpeed =
  (speedChange = 0, reset = false) =>
  (dispatch, getState) =>
    handleAdjustSpeed(dispatch, getState, speedChange, reset);

export default playerSlice.reducer;
