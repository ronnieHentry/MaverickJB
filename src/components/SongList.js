import React, {useState, useEffect} from 'react';
import {View, StyleSheet, VirtualizedList} from 'react-native';
import {fetchMp3Files, fetchMusicFilesMetadata} from './utils/helper';
import SongItem from './SongItem';

const SongList = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const mp3Files = await fetchMp3Files();
        const formattedSongs = await fetchMusicFilesMetadata();
        setSongs(formattedSongs);
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
        renderItem={({item}) => <SongItem item={item} key={item.id} />}
        keyExtractor={item => item.id}
        getItem={getItem}
        getItemCount={getItemCount}
        key={item => item.id}
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
