// utils/playerUtils.js
import {clamp, getPitchMultiplier} from './helper';
import {
  getSoundInstance,
  releaseSoundInstance,
  createSoundInstance,
} from './soundInstance';
import {resetAbRepeat} from '../../store/slices/abRepeatControls';
import {
  setDuration,
  setPitch,
  setSpeed,
  clearCurrentSound,
  setPlaybackPosition,
  setCurrentSound,
  setPaused,
  setPlaying,
} from '../../store/slices/playerSlice';
import {
  setCurrentIndex,
  incrementIndex,
  selectCurrentSong,
} from '../../store/slices/songsSlice';

export const handlePlaySound = (dispatch, getState, song, index) => {
  resetAbRepeat(dispatch);
  releaseSoundInstance();

  const {path, title, artist, album, image} = song;

  createSoundInstance(path, sound => {
    const {pitch} = getState().playerSlice;
    sound.setPitch(getPitchMultiplier(pitch));
    const duration = sound.getDuration();
    dispatch(setDuration(duration));
    sound.play(() => dispatch(handlePlayNext(dispatch, getState)));
  });

  dispatch(setCurrentSound({path, title, artist, album, image}));
  dispatch(setCurrentIndex(index));
};

export const handlePlayNext = (dispatch, getState) => {
  resetAbRepeat(dispatch);
  dispatch(incrementIndex());

  const updatedState = getState();
  const nextSong = selectCurrentSong(updatedState);

  if (nextSong) {
    handlePlaySound(
      dispatch,
      getState,
      nextSong,
      updatedState.songsSlice.currentIndex,
    );
  } else {
    dispatch(clearCurrentSound());
  }
};

export const handlePlayPrevious = (dispatch, getState) => {
  resetAbRepeat(dispatch);

  const state = getState();
  const sound = getSoundInstance();

  if (sound) {
    sound.getCurrentTime(seconds => {
      if (seconds > 3) {
        sound.setCurrentTime(0); // Just restart current song
      } else {
        const currentIndex = state.songsSlice.currentIndex;

        if (currentIndex > 0) {
          const newIndex = currentIndex - 1;
          const songList = state.songsSlice.songs;
          const prevSong = songList[newIndex];

          if (prevSong) {
            handlePlaySound(dispatch, getState, prevSong, newIndex);
          }
        } else {
          sound.setCurrentTime(0); // If it's the first song, restart
        }
      }
    });
  }
};

export const handleStopSound = dispatch => {
  releaseSoundInstance();
  dispatch(clearCurrentSound());
  resetAbRepeat(dispatch);
};

export const handlePlayBack = dispatch => {
  resetAbRepeat(dispatch);
  const sound = getSoundInstance();
  if (sound) {
    sound.getCurrentTime(seconds => {
      const newPosition = Math.max(seconds - 3, 0);
      sound.setCurrentTime(newPosition);
    });
  }
};

export const handlePlayForward = dispatch => {
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

export const handleTogglePlayPause = (dispatch, getState) => {
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

export const handleSeekToPosition = (dispatch, normalizedPosition) => {
  const sound = getSoundInstance();
  if (sound) {
    const duration = sound.getDuration();
    const targetPosition = normalizedPosition * duration;
    sound.setCurrentTime(targetPosition);
    dispatch(setPlaybackPosition(normalizedPosition));
  }
};

export const handleUpdatePlaybackPosition = dispatch => {
  const sound = getSoundInstance();
  if (sound) {
    sound.getCurrentTime(seconds => {
      const duration = sound.getDuration();
      const normalizedPosition = seconds / duration;
      dispatch(setPlaybackPosition(normalizedPosition));
    });
  }
};

export const handleAdjustPitch = (
  dispatch,
  getState,
  pitchChange = 0,
  reset = false,
) => {
  let newPitch = reset
    ? 0
    : clamp(getState().playerSlice.pitch + pitchChange, -12, 12);

  dispatch(setPitch(newPitch));

  const sound = getSoundInstance();
  if (sound) {
    sound.setPitch(getPitchMultiplier(newPitch));
  }
};

export const handleAdjustSpeed = (
  dispatch,
  getState,
  speedChange = 0,
  reset = false,
) => {
  let newSpeed = reset
    ? 1
    : clamp(getState().playerSlice.speed + speedChange, 0.25, 5.0);

  dispatch(setSpeed(newSpeed));

  const sound = getSoundInstance();
  if (sound) {
    sound.setSpeed(newSpeed);
  }
};
