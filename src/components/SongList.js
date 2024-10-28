import React, {useState, useEffect} from 'react';
import {View, StyleSheet, VirtualizedList} from 'react-native';
import {fetchMp3Files, fetchMusicFilesMetadata} from './utils/helper';
import {setSongsList} from '../store/slices/songsSlice';
import SongItem from './SongItem';
import {useSelector, useDispatch} from 'react-redux';

const SongList = () => {
  const dispatch = useDispatch();
  const {songs} = useSelector(state => state.songsSlice);
  // const [songs, setSongs] = useState([]);

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const mp3Files = await fetchMp3Files();
        const formattedSongs = await fetchMusicFilesMetadata();
        // setSongs(formattedSongs);
        dispatch(setSongsList({songs: formattedSongs}));
      } catch (error) {
        console.error('Error loading songs:', error);
      }
    };

    loadSongs();
  }, []);

  const getItem = (data, index) => data[index];
  const getItemCount = data => data.length;

  return (
    <View style={styles.container}>
      <VirtualizedList
        data={songs}
        initialNumToRender={10}
        renderItem={({item}) => <SongItem item={item} />}
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
