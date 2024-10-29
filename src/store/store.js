import {configureStore} from '@reduxjs/toolkit';
import songsSliceReducer from './slices/songsSlice';
import playerSliceReducer from './slices/playerSlice';
import controlsReducer from './slices/controlsSlice'

export const store = configureStore({
  reducer: {
    songsSlice: songsSliceReducer,
    playerSlice: playerSliceReducer,
    controlsSlice: controlsReducer,
  },
});
