import {createSlice} from '@reduxjs/toolkit';
import Sound from 'react-native-sound';

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    currentSound: null,
    isPlaying: false,
  },
  reducers: {
    playSound: (state, action) => {
      if (state.currentSound) {
        state.currentSound.stop().release();  // Stop and release previous sound
      }
      const sound = new Sound(action.payload.path, Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.error('Failed to load sound', error);
          return;
        }
        sound.setPitch(1.6); 
        sound.play();
      });
      state.currentSound = sound;
      state.isPlaying = true;
    },
    stopSound: (state) => {
      if (state.currentSound) {
        state.currentSound.stop().release();
        state.currentSound = null;
      }
      state.isPlaying = false;
    },
  },
});

export const {playSound, stopSound} = playerSlice.actions;
export default playerSlice.reducer;
