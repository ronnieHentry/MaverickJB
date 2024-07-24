import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Ionicons';

const Player = ({ route }) => {
  const { song } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {/* Back button logic */}}>
          <Icon name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.nowPlaying}>Now Playing</Text>
        <TouchableOpacity onPress={() => {/* Settings button logic */}}>
          <Icon name="settings-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: song.image }} style={styles.image} />
      <Text style={styles.title}>{song.title}</Text>
      <Text style={styles.artist}>{song.artist} (2020)</Text>

      <View style={styles.sliderContainer}>
        <Text style={styles.time}>01:27</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#ff0000"
          maximumTrackTintColor="#333"
          thumbTintColor="#ff0000"
        />
        <Text style={styles.time}>04:56</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity>
          <Icon name="shuffle-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="play-skip-back-outline" size={48} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="pause-circle-outline" size={64} color="#ff0000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="play-skip-forward-outline" size={48} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="repeat-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  nowPlaying: {
    color: '#fff',
    fontSize: 18,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  artist: {
    color: '#b3b3b3',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  time: {
    color: '#b3b3b3',
    fontSize: 14,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
  },
});

export default Player;
