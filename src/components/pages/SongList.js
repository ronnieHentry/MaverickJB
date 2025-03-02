import React, {useEffect, useState} from 'react';
import {View, StyleSheet, VirtualizedList} from 'react-native';
import {fetchMusicFilesMetadata} from '../utils/helper';
import {setSongsList} from '../../store/slices/songsSlice';
import {playSound, stopSound} from '../../store/slices/playerSlice';
import {resetAb} from '../../store/slices/controlsSlice';
import SongItem from '../ReusableComponents/SongItem';
import {useSelector, useDispatch} from 'react-redux';
import MiniPlayer from '../ReusableComponents/MiniPlayer';

const SongList = () => {
  const dispatch = useDispatch();
  const {songs} = useSelector(state => state.songsSlice);
  const {isPlaying, isPaused} = useSelector(state => state.playerSlice);
  const {currentIndex} = useSelector(state => state.songsSlice);

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const formattedSongs = await fetchMusicFilesMetadata();
        dispatch(setSongsList({songs: formattedSongs}));
      } catch (error) {
        console.error('Error loading songs:', error);
      }
    };

    loadSongs();
  }, []);

  const handlePress = (song, index) => {
    dispatch(resetAb());
    dispatch(stopSound());
    dispatch(playSound(song, index));
  };

  const getItem = (data, index) => data[index];
  const getItemCount = data => data.length;

  return (
    <View style={styles.container}>
      <VirtualizedList
        data={songs}
        initialNumToRender={10}
        renderItem={({item, index}) => (
          <SongItem
            item={item}
            onPress={() => handlePress(item, index)}
            isPlaying={currentIndex === index && isPlaying}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
        getItem={getItem}
        getItemCount={getItemCount}
        contentContainerStyle={{paddingBottom: 80}}
      />
      {(isPlaying || isPaused) && <MiniPlayer />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 10,
    paddingTop: 30,
  },
});

export default SongList;
