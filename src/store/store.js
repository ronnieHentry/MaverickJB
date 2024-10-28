import {configureStore} from '@reduxjs/toolkit';
import songsSliceReducer from './slices/songsSlice';

export const store = configureStore({
  reducer: {
    songsSlice: songsSliceReducer,
  },
});
