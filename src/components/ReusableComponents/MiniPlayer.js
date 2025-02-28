import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {playNextSound, togglePlayPause} from '../../store/slices/playerSlice';
import {useNavigation} from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';

const MiniPlayer = ({song, index}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // If no song is provided, don't render the mini player
  if (!song) {
    return null;
  }

  const {title, artist, image, isPlaying} = song;
  const imageSource = typeof image === 'string' ? {uri: image} : image;

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('Player', {index}); // Pass the index to the Player screen
      }}>
      <View style={styles.container}>
        {/* Add sharedTransitionTag to the image */}
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
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => dispatch(togglePlayPause())}>
          <Icon name={isPlaying ? 'pause' : 'play'} size={24} color="#ff0000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => dispatch(playNextSound())}>
          <Icon name="play-skip-forward" size={24} color="#ff0000" />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 30, 30, 0.9)', // Semi-transparent background
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#444',
    position: 'absolute', // Position the mini player at the bottom
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 15, // Rounded corners
    marginHorizontal: 10, // Add some horizontal margin
    marginBottom: 13, // Add some bottom margin
    shadowRadius: 4,
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
    fontWeight: '1300',
  },
  artist: {
    color: '#b3b3b3',
    fontSize: 12,
  },
  controlButton: {
    paddingHorizontal: 10,
  },
});

export default MiniPlayer;
