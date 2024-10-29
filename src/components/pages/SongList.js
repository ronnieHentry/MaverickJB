import React, {useEffect} from 'react';
import {View, StyleSheet, VirtualizedList} from 'react-native';
import {fetchMusicFilesMetadata} from '../utils/helper';
import {setSongsList} from '../../store/slices/songsSlice';
import {playSound, stopSound} from '../../store/slices/playerSlice';
import { resetAb } from '../../store/slices/controlsSlice';
import SongItem from '../ReusableComponents/SongItem';
import {useSelector, useDispatch} from 'react-redux';

const SongList = () => {
  const dispatch = useDispatch();
  const {songs} = useSelector(state => state.songsSlice);

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

  const handlePress = (song) => {
    dispatch(resetAb());
    dispatch(stopSound());
    dispatch(playSound(song.path));
    
  };  

  const getItem = (data, index) => data[index];
  const getItemCount = data => data.length;

  return (
    <View style={styles.container}>
      <VirtualizedList
        data={songs}
        initialNumToRender={10}
        renderItem={({item}) => (
          <SongItem item={item} onPress={() => handlePress(item)} />
        )}
        keyExtractor={item => item.id}
        getItem={getItem}
        getItemCount={getItemCount}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 10,
    paddingTop: 30,
    paddingBottom: 30,
  },
});

export default SongList;
