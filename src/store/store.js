import {configureStore} from '@reduxjs/toolkit';
import songsSliceReducer from './slices/songsSlice';
import playerSliceReducer from './slices/playerSlice'

export const store = configureStore({
  reducer: {
    songsSlice: songsSliceReducer,
    playerSlice: playerSliceReducer
  },
});
