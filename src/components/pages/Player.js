import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  Animated,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {formatTime, getImageSource} from '../utils/helper';
import {
  toggleEq,
  toggleSpeed,
  togglePitch,
  toggleAb,
  toggleShuffle,
  toggleRepeat,
} from '../../store/slices/controlsSlice';
import ToggleButtons from '../ReusableComponents/ToggleButtons';
import {
  adjustPitch,
  adjustSpeed,
  playBack,
  playForward,
  playNextSound,
  playPreviousSound,
  seekToPosition,
  togglePlayPause,
  updatePlaybackPosition,
} from '../../store/slices/playerSlice';
import PlayerControls from '../ReusableComponents/PlayerControls';
import ControlModal from '../ReusableComponents/ControlModal';
import {
  NEGATIVE_PITCH_INCREMENTS,
  NEGATIVE_SPEED_INCREMENTS,
  POSITIVE_PITCH_INCREMENTS,
  POSITIVE_SPEED_INCREMENTS,
} from '../utils/constants';
import {SharedElement} from 'react-navigation-shared-element';
import useSwipeDownToGoBack from '../utils/useSwipeDownToGoBack';
import {toggleAbRepeat} from '../../store/slices/abRepeatControls';

const {width} = Dimensions.get('window'); // Get screen width for responsive design

const Player = ({onClose, route}) => {
  const index = useSelector(state => state.songsSlice.currentIndex);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isPitchModalVisible, setPitchModalVisible] = useState(false);
  const [isSpeedModalVisible, setSpeedModalVisible] = useState(false);
  const {eqOn, speedOn, pitchOn, abState, shuffleOn, repeatOn} = useSelector(
    state => state.controlsSlice,
  );
  const {
    title,
    artist,
    album,
    isPlaying,
    playbackPosition,
    duration,
    image,
    pitch,
    speed,
  } = useSelector(state => state.playerSlice);

  const {pan, panResponder, fadeOthers} = useSwipeDownToGoBack(onClose);

  const toggleButtons = [
    // {label: 'EQ', isActive: eqOn, onPress: () => dispatch(toggleEq())},
    {
      label: 'Speed',
      isActive: speed !== 1,
      onPress: () => {
        dispatch(toggleSpeed(speed));
        handleToggleSpeedModal();
      },
    },
    {
      label: 'Pitch',
      isActive: pitch !== 0,
      onPress: () => {
        dispatch(togglePitch(pitch));
        handleTogglePitchModal();
      },
    },
    {
      label: `A-B`,
      isActive: abState !== 'off',
      onPress: () => {
        dispatch(toggleAb());
        dispatch(toggleAbRepeat());
      },
      abState,
    },
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
      onPress: () => dispatch(playPreviousSound()),
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
      onPress: () => dispatch(playNextSound()),
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
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        onClose();
        return true;
      },
    );

    return () => backHandler.remove();
  }, [onClose]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updatePlaybackPosition());
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const currentTime = formatTime(playbackPosition * duration);
  const totalTime = formatTime(duration);

  const handleTogglePitchModal = () =>
    setPitchModalVisible(!isPitchModalVisible);
  const handleToggleSpeedModal = () =>
    setSpeedModalVisible(!isSpeedModalVisible);

  return (
    <Animated.View
      style={[styles.container, {transform: pan.getTranslateTransform()}]}
      {...panResponder.panHandlers}>
      <Animated.View style={{opacity: fadeOthers, width: '100%'}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Icon name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.nowPlaying}>Now Playing</Text>
          <TouchableOpacity>
            <Icon name="settings-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </Animated.View>
      <SharedElement id={`song-${index}`}>
        <Image source={getImageSource(image)} style={styles.image} />
      </SharedElement>
      <Animated.View style={{opacity: fadeOthers, width: '100%'}}>
        <View style={styles.metaContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
          <Text style={styles.artist} numberOfLines={1} ellipsizeMode="tail">
            {artist}
          </Text>
        </View>

        <ToggleButtons buttons={toggleButtons} />

        <ControlModal
          visible={isPitchModalVisible}
          onClose={() => setPitchModalVisible(false)}
          onChangeValue={(val, reset) => {
            dispatch(adjustPitch(val, reset));
          }}
          label="Pitch"
          min={-12}
          max={12}
          step={1}
          increments={{
            negative: NEGATIVE_PITCH_INCREMENTS,
            positive: POSITIVE_PITCH_INCREMENTS,
          }}
          value={pitch}
        />

        <ControlModal
          visible={isSpeedModalVisible}
          onClose={() => setSpeedModalVisible(false)}
          onChangeValue={(val, reset) => {
            dispatch(adjustSpeed(val, reset));
          }}
          label="Speed"
          min={0.25}
          max={5.0}
          step={0.05}
          increments={{
            negative: NEGATIVE_SPEED_INCREMENTS,
            positive: POSITIVE_SPEED_INCREMENTS,
          }}
          initialValue={1}
          value={speed}
        />

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
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 15,
    marginBottom: 10,
  },
  metaContainer: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  artist: {
    color: '#d3d3d3',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 4,
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
    width: 50,
    textAlign: 'center',
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
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
