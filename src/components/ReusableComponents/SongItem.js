import React from 'react';
import {
  View,
  Text,
  Animated,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {usePlayingAnimation} from '../utils/usePlayingAnimation';

const SongItem = React.memo(({item, onPress, isPlaying}) => {
  const {scaleAnim} = usePlayingAnimation(isPlaying);

  const imageSource =
    typeof item.image === 'string' ? {uri: item.image} : item.image;

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.songContainer,
          isPlaying && styles.playingSongContainer,
        ]}>
        <Animated.Image
          source={imageSource}
          style={[styles.image, {transform: [{scale: scaleAnim}]}]}
        />
        <View style={styles.songDetails}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.artist}>{item.artist}</Text>
        </View>
        {/* <TouchableOpacity style={styles.playButton}>
          {isPlaying ? (
            <Text style={styles.pauseText}>❚❚</Text>
          ) : (
            <Text style={styles.playText}>▶</Text>
          )}
        </TouchableOpacity> */}
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
    backgroundColor: 'rgba(0, 0, 0, 0.96)',
    borderRadius: 10,
  },
  playingSongContainer: {
    backgroundColor: 'rgba(40, 34, 34, 0.96)', // Highlight for currently playing song
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
});

export default SongItem;
