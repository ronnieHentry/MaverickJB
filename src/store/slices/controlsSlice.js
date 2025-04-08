import {createSlice} from '@reduxjs/toolkit';
import {stopAbLoop} from './abRepeatControls';

const initialState = {
  eqOn: false,
  speedOn: false,
  pitchOn: false,
  abState: 'off', // 'off' | 'a' | 'b'
  shuffleOn: false,
  repeatOn: false,
};

const controlsSlice = createSlice({
  name: 'controls',
  initialState,
  reducers: {
    toggleEq: state => {
      state.eqOn = !state.eqOn;
    },
    toggleSpeed: (state, action) => {
      state.speedOn = action.payload !== 1;
    },
    togglePitch: (state, action) => {
      state.pitchOn = action.payload !== 0;
    },
    toggleAb: state => {
      if (state.abState === 'off') {
        state.abState = 'a';
      } else if (state.abState === 'a') {
        state.abState = 'b';
      } else {
        state.abState = 'off';
      }
    },
    resetAb: state => {
      state.abState = 'off';
      stopAbLoop();
    },
    toggleShuffle: state => {
      state.shuffleOn = !state.shuffleOn;
    },
    toggleRepeat: state => {
      state.repeatOn = !state.repeatOn;
    },
  },
});

export const {
  toggleEq,
  toggleSpeed,
  togglePitch,
  toggleAb,
  resetAb,
  toggleShuffle,
  toggleRepeat,
} = controlsSlice.actions;
export default controlsSlice.reducer;
