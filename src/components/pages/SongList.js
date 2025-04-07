import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {View, StyleSheet, VirtualizedList, TextInput} from 'react-native';
import {fetchMusicFilesMetadata} from '../utils/helper';
import {setSongsList} from '../../store/slices/songsSlice';
import {playSound, stopSound} from '../../store/slices/playerSlice';
import {resetAb} from '../../store/slices/controlsSlice';
import SongItem from '../ReusableComponents/SongItem';
import {useSelector, useDispatch} from 'react-redux';
import MiniPlayer from '../ReusableComponents/MiniPlayer';
import Player from './Player'; // Import the Player component

const SongList = () => {
  const dispatch = useDispatch();
  const {songs, currentIndex} = useSelector(state => state.songsSlice);
  const {isPlaying, isPaused} = useSelector(state => state.playerSlice);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlayerVisible, setPlayerVisible] = useState(false); // State to control Player visibility

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

  const handlePress = useCallback(
    (song, index) => {
      dispatch(resetAb());
      dispatch(stopSound());
      dispatch(playSound(song, index));
    },
    [dispatch],
  );

  const filteredSongs = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return songs.filter(
      song =>
        song?.title?.toLowerCase().includes(query) ||
        song?.artist?.toLowerCase().includes(query),
    );
  }, [searchQuery, songs]);

  const getItem = useCallback((data, index) => data[index], []);
  const getItemCount = useCallback(data => data.length, []);

  const renderItem = useCallback(
    ({item, index}) => (
      <SongItem
        item={item}
        onPress={() => handlePress(item, index)}
        isPlaying={currentIndex === index && isPlaying}
      />
    ),
    [handlePress, currentIndex, isPlaying],
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search songs or artists..."
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.listContainer}>
        <VirtualizedList
          data={songs}
          initialNumToRender={10}
          maxToRenderPerBatch={15}
          windowSize={21}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          getItem={getItem}
          getItemCount={getItemCount}
          contentContainerStyle={{paddingBottom: 60}}
        />
      </View>
      {(isPlaying || isPaused) && (
        <View style={styles.miniPlayerContainer}>
          <MiniPlayer onPress={() => setPlayerVisible(true)} />
        </View>
      )}
      {isPlayerVisible && (
        <View style={styles.playerContainer}>
          <Player onClose={() => setPlayerVisible(false)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.96)',
    padding: 10,
    paddingTop: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#fff',
  },
  listContainer: {
    flex: 9,
  },
  miniPlayerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerContainer: {
    ...StyleSheet.absoluteFillObject, // Make the Player fill the screen
    backgroundColor: '#000', // Optional: Add a background color
    zIndex: 10, // Ensure it appears on top
  },
});

export default SongList;
