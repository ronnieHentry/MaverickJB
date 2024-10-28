import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  songs: null,
  isPlaying: false,
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    setSongsList: (state, action) => {
      console.log(action);
      state.songs = action.payload;
    },
  },
});

export const {setSongsList} = songsSlice.actions;

export default songsSlice.reducer;
