import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  songs: [],
  isPlaying: false,
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    setSongsList: (state, action) => {
      state.songs = action.payload.songs;
    },
  },
});

export const {setSongsList} = songsSlice.actions;

export default songsSlice.reducer;
