import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {formatTime, getImageSource, handleToggle} from '../utils/helper';
import {
  toggleEq,
  toggleSpeed,
  togglePitch,
  toggleAb,
  resetAb,
  toggleShuffle,
  toggleRepeat,
} from '../../store/slices/controlsSlice';
import ToggleButtons from '../ReusableComponents/ToggleButtons';
import {
  playBack,
  playForward,
  seekToPosition,
  togglePlayPause,
  updatePlaybackPosition,
} from '../../store/slices/playerSlice';
import PlayerControls from '../ReusableComponents/PlayerControls';

const Player = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {song} = route.params;
  const {eqOn, speedOn, pitchOn, abOn, shuffleOn, repeatOn} = useSelector(
    state => state.controlsSlice,
  );
  const {isPlaying, playbackPosition, duration} = useSelector(
    state => state.playerSlice,
  );

  const toggleButtons = [
    {label: 'EQ', isActive: eqOn, onPress: () => dispatch(toggleEq())},
    {label: 'Speed', isActive: speedOn, onPress: () => dispatch(toggleSpeed())},
    {label: 'Pitch', isActive: pitchOn, onPress: () => dispatch(togglePitch())},
    {label: 'A-B', isActive: abOn, onPress: () => dispatch(toggleAb())},
  ];

  const buttons = [
    {
      name: 'shuffle-outline',
      size: 24,
      onPress: () => dispatch(toggleShuffle()),
      iconColor: shuffleOn ? '#ff0000' : '#fff',
    },
    {
      name: 'play-skip-back-outline',
      size: 48,
      onPress: () => console.log('Skip Back'),
      iconColor: '#fff',
    },
    {
      name: 'play-back-outline',
      size: 48,
      onPress: () => dispatch(playBack()),
      iconColor: '#fff',
    },
    {
      name: isPlaying ? 'pause-circle-outline' : 'play-circle-outline',
      size: 84,
      onPress: () => {
        dispatch(togglePlayPause());
      },
      iconColor: '#fff',
    },
    {
      name: 'play-forward-outline',
      size: 48,
      onPress: () => dispatch(playForward()),
      iconColor: '#fff',
    },
    {
      name: 'play-skip-forward-outline',
      size: 48,
      onPress: () => console.log('Skip Forward'),
      iconColor: '#fff',
    },
    {
      name: 'repeat-outline',
      size: 24,
      onPress: () => dispatch(toggleRepeat()),
      iconColor: repeatOn ? '#ff0000' : '#fff',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updatePlaybackPosition());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const currentTime = formatTime(playbackPosition * duration);
  const totalTime = formatTime(duration);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('SongList')}>
          <Icon name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.nowPlaying}>Now Playing</Text>
        <TouchableOpacity>
          <Icon name="settings-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <Image source={getImageSource(song.image)} style={styles.image} />
      <Text style={styles.title}>{song.title}</Text>
      <Text style={styles.artist}>{song.artist}</Text>

      <ToggleButtons buttons={toggleButtons} />

      <View style={styles.sliderContainer}>
        <Text style={styles.time}>{currentTime}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#ff0000"
          maximumTrackTintColor="#555"
          thumbTintColor="#ff0000"
          value={playbackPosition}
          onSlidingComplete={value => dispatch(seekToPosition(value))}
        />
        <Text style={styles.time}>{totalTime}</Text>
      </View>
      <View style={styles.buttons}>
        <PlayerControls buttons={buttons} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  nowPlaying: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 15,
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  artist: {
    color: '#d3d3d3',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 10,
    width: '22%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 9,
    marginBottom: 5,
  },
  buttonLabel: {
    color: '#d3d3d3',
    fontSize: 11,
    marginTop: 5,
  },
  bar: {
    height: 4,
    width: '100%',
    backgroundColor: '#555',
    marginVertical: 5,
  },
  barOn: {
    backgroundColor: '#ff0000',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  time: {
    color: '#d3d3d3',
    fontSize: 14,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
});

export default Player;
