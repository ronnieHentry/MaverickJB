import {
  setPointA,
  setPointB,
  clearAbRepeat,
  soundInstance,
} from './playerSlice';

let loopInterval = null;

export const toggleAbRepeat = () => (dispatch, getState) => {
  const {abRepeat} = getState().playerSlice;
  console.log(abRepeat);

  // Case 1: Set Point A
  if (!abRepeat.pointA) {
    if (soundInstance) {
      soundInstance.getCurrentTime(seconds => {
        dispatch(setPointA(seconds));
      });
      // console.log('Set Point A:', abRepeat.pointA);
    }
  }

  // Case 2: Set Point B
  else if (!abRepeat.pointB) {
    if (soundInstance) {
      soundInstance.getCurrentTime(seconds => {
        dispatch(setPointB(seconds));
        startAbLoop(getState); // Start looping only now
      });
      // console.log('Set Point B:', abRepeat.pointB);
    }
  }

  // Case 3: Reset
  else {
    dispatch(clearAbRepeat());
    stopAbLoop();
  }
};

export const startAbLoop = getState => {
  if (loopInterval) return;

  loopInterval = setInterval(() => {
    const {abRepeat} = getState().playerSlice;

    if (
      abRepeat.isActive &&
      abRepeat.pointA !== null &&
      abRepeat.pointB !== null &&
      soundInstance
    ) {
      soundInstance.getCurrentTime(seconds => {
        if (seconds >= abRepeat.pointB) {
          soundInstance.setCurrentTime(abRepeat.pointA);
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
