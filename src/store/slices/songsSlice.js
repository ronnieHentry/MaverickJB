import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  songs: [],
  currentIndex: 0,
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    setSongsList: (state, action) => {
      state.songs = action.payload.songs;
      state.currentIndex = 0;
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    incrementIndex: state => {
      if (state.currentIndex < state.songs.length - 1) {
        state.currentIndex += 1;
      } else {
        state.currentIndex = 0;
      }
    },
  },
});

export const {setSongsList, incrementIndex, setCurrentIndex} =
  songsSlice.actions;

export const selectCurrentSong = state =>
  state.songsSlice.songs[state.songsSlice.currentIndex];

export default songsSlice.reducer;
