import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  eqOn: false,
  speedOn: false,
  pitchOn: false,
  abOn: false,
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
    toggleSpeed: state => {
      state.speedOn = !state.speedOn;
    },
    togglePitch: state => {
      state.pitchOn = !state.pitchOn;
    },
    toggleAb: state => {
      state.abOn = !state.abOn;
    },
    resetAb: state => {
      state.abOn = false;
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
