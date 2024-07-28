import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SongItem = React.memo(({item}) => {
  const navigation = useNavigation();
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
});

const styles = StyleSheet.create({
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
    borderRadius: 5,
    marginRight: 10,
  },
  songDetails: {
    flex: 1,
  },
  title: {
    color: '#f5f5f5',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'HelveticaNeue',
  },
  artist: {
    color: '#b3b3b3',
    fontSize: 14,
    fontFamily: 'HelveticaNeue-Light',
  },
  playButton: {
    padding: 10,
  },
  playText: {
    color: '#ff0000',
    fontSize: 20,
  },
});

export default SongItem;
