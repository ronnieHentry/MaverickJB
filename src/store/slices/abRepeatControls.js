import {getSoundInstance} from '../../components/utils/soundInstance';
import {resetAb} from './controlsSlice';
import {setPointA, setPointB, clearAbRepeat} from './playerSlice';

let loopInterval = null;

export const toggleAbRepeat = () => (dispatch, getState) => {
  const {abRepeat} = getState().playerSlice;
  const sound = getSoundInstance();
  if (!sound) return;

  if (!abRepeat.pointA) {
    sound.getCurrentTime(seconds => {
      dispatch(setPointA(seconds));
    });
  } else if (!abRepeat.pointB) {
    sound.getCurrentTime(seconds => {
      dispatch(setPointB(seconds));
      startAbLoop(getState);
    });
  } else {
    dispatch(clearAbRepeat());
    stopAbLoop();
  }
};

export const startAbLoop = getState => {
  if (loopInterval) return;

  loopInterval = setInterval(() => {
    const {abRepeat} = getState().playerSlice;
    const sound = getSoundInstance();

    if (
      abRepeat.isActive &&
      abRepeat.pointA !== null &&
      abRepeat.pointB !== null &&
      sound
    ) {
      sound.getCurrentTime(seconds => {
        if (seconds >= abRepeat.pointB) {
          sound.setCurrentTime(abRepeat.pointA);
        }
      });
    }
  }, 500);
};

export const stopAbLoop = () => {
  if (loopInterval) {
    clearInterval(loopInterval);
    loopInterval = null;
  }
};

export const resetAbRepeat = dispatch => {
  stopAbLoop();
  dispatch(clearAbRepeat());
  dispatch(resetAb());
};
