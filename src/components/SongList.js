import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import {
  getAll,
  SortSongFields,
  SortSongOrder,
} from 'react-native-get-music-files';

const defaultImage = require('../../assets/Icon-removebg-preview.png');

const SongList = () => {
  const [songs, setSongs] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadSongs = async () => {
      try {
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

        // Fetch metadata for all found mp3 files
        const musicFiles = await getAll({
          limit: 200,
          offset: 0,
          coverQuality: 50,
          minSongDuration: 1000,
          sortBy: SortSongFields.TITLE,
          sortOrder: SortSongOrder.DESC,
        });

        const formattedSongs = musicFiles.map(file => ({
          id: file.path,
          title: file.title,
          artist: file.author,
          image: file.cover || defaultImage,
          path: file.path,
        }));

        setSongs(formattedSongs);
      } catch (error) {
        console.error('Error loading songs:', error);
      }
    };

    loadSongs();
  }, []);

  const renderItem = ({item}) => {
    const imageSource =
      typeof item.image === 'string' ? {uri: item.image} : item.image;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Player', {song: item})}>
        <View style={styles.songContainer}>
          <Image source={imageSource} style={styles.image} />
          <View style={styles.songDetails}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.artist}>{item.artist}</Text>
          </View>
          <TouchableOpacity style={styles.playButton}>
            <Text style={styles.playText}>▶</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={songs}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
  songContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  songDetails: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  artist: {
    color: '#b3b3b3',
    fontSize: 14,
  },
  playButton: {
    padding: 10,
  },
  playText: {
    color: '#ff0000',
    fontSize: 20,
  },
});

export default SongList;
