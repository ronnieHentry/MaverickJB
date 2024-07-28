import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SongItem = React.memo(({ item, key }) => {
  const navigation = useNavigation();
  const imageSource = typeof item.image === 'string' ? { uri: item.image } : item.image;

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Player', { song: item })}>
      <View style={styles.songContainer} key={key}>
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

export default SongItem;
