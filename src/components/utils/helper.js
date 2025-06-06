import RNFS from 'react-native-fs';
import {
  getAll,
  SortSongFields,
  SortSongOrder,
} from 'react-native-get-music-files';

export const defaultImage = require('../../../assets/Icon-removebg-preview.png');

export const fetchMp3Files = async () => {
  const commonMusicDirs = [RNFS.ExternalStorageDirectoryPath + '/Music'];
  const mp3Files = [];

  for (const dir of commonMusicDirs) {
    const files = await RNFS.readDir(dir);
    files.forEach(file => {
      if (file.isFile() && file.name.endsWith('.mp3')) {
        mp3Files.push(file.path);
      }
    });
  }
  return mp3Files;
};

export const fetchMusicFilesMetadata = async () => {
  const musicFiles = await getAll({
    limit: 9999,
    offset: 0,
    coverQuality: 50,
    minSongDuration: 1000,
    sortBy: SortSongFields.TITLE,
    sortOrder: SortSongOrder.DESC,
  });

  return musicFiles.map(file => ({
    id: file.url,
    title: file.title,
    artist: file.author,
    image: file.cover || defaultImage,
    path: file.url,
  }));
};

// Get the appropriate image source based on the type
export const getImageSource = image => {
  if (typeof image === 'string') {
    return {uri: image};
  }
  return image || defaultImage;
};

// Handle play/pause button toggle
export const handlePlayPause = (isPlaying, setIsPlaying) => {
  setIsPlaying(!isPlaying);
};

// Handle toggle for buttons
export const handleToggle = (setter, currentState) => {
  setter(!currentState);
};

export const formatTime = timeInSeconds => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0',
  )}`;
};

export const getPitchMultiplier = semitoneChange => {
  return Math.pow(2, semitoneChange / 12);
};

export const clamp = (value, min, max) => Math.max(min, Math.min(value, max));
