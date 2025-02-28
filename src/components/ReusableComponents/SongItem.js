import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

const SongItem = React.memo(({item, onPress, isPlaying}) => {
  // const playingGif = require("../../../assets/Playing")
  const imageSource =
    typeof item.image === 'string' ? {uri: item.image} : item.image;

  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}>
      <View style={styles.songContainer}>
        <Image source={imageSource} style={styles.image} />
        <View style={styles.songDetails}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.artist}>{item.artist}</Text>
        </View>
        <TouchableOpacity style={styles.playButton}>
          {isPlaying ? (
            <Image
              source={require('../../../assets/Playing.gif')} // Path to your GIF
              style={styles.gif}
            />
          ) : (
            <Text style={styles.playText}>▶</Text>
          )}
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
    color: '#e0e0e0',
    fontSize: 16,
    fontWeight: '600',
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
  gif: {
    width: 40,
    height: 40,
  },
});

export default SongItem;
