import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {playNextSound, togglePlayPause} from '../../store/slices/playerSlice';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';

const MiniPlayer = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const index = useSelector(state => state.songsSlice.currentIndex);
  const {title, artist, isPlaying, image} = useSelector(
    state => state.playerSlice,
  );

  const imageSource = typeof image === 'string' ? {uri: image} : image;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Player', {index});
      }}
      activeOpacity={0.8}
      style={styles.container}>
      <SharedElement id={`song-${index}`}>
        <Image source={imageSource} style={styles.image} />
      </SharedElement>
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {artist}
        </Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => dispatch(togglePlayPause())}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Icon name={isPlaying ? 'pause' : 'play'} size={24} color="#ff0000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => dispatch(playNextSound())}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Icon name="play-skip-forward" size={24} color="#ff0000" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 30, 30, 0.9)',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#444',
    borderRadius: 0,
    shadowRadius: 4,
    zIndex: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#e0e0e0',
    fontSize: 16,
    fontWeight: 'bold',
  },
  artist: {
    color: '#b3b3b3',
    fontSize: 12,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    paddingHorizontal: 10,
  },
});

export default MiniPlayer;
