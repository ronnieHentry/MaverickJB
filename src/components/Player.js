import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const getImageSource = image => {
  if (typeof image === 'string') {
    return {uri: image};
  }
  return image;
};

const Player = ({route}) => {
  const navigation = useNavigation();
  const {song} = route.params;

  const [eqOn, setEqOn] = useState(false);
  const [speedOn, setSpeedOn] = useState(false);
  const [pitchOn, setPitchOn] = useState(false);
  const [abOn, setAbOn] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleToggle = (setter, currentState) => {
    setter(!currentState);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SongList');
          }}>
          <Icon name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.nowPlaying}>Now Playing</Text>
        <TouchableOpacity
          onPress={() => {
            /* Settings button logic */
          }}>
          <Icon name="settings-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <Image source={getImageSource(song.image)} style={styles.image} />
      <Text style={styles.title}>{song.title}</Text>
      <Text style={styles.artist}>{song.artist}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleToggle(setEqOn, eqOn)}>
          <Text style={styles.buttonText}>{eqOn ? 'ON' : 'OFF'}</Text>
          <View style={[styles.bar, eqOn && styles.barOn]} />
          <Text style={styles.buttonLabel}>EQ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleToggle(setSpeedOn, speedOn)}>
          <Text style={styles.buttonText}>{speedOn ? 'ON' : 'OFF'}</Text>
          <View style={[styles.bar, speedOn && styles.barOn]} />
          <Text style={styles.buttonLabel}>Speed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleToggle(setPitchOn, pitchOn)}>
          <Text style={styles.buttonText}>{pitchOn ? 'ON' : 'OFF'}</Text>
          <View style={[styles.bar, pitchOn && styles.barOn]} />
          <Text style={styles.buttonLabel}>Pitch</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleToggle(setAbOn, abOn)}>
          <Text style={styles.buttonText}>{abOn ? 'ON' : 'OFF'}</Text>
          <View style={[styles.bar, abOn && styles.barOn]} />
          <Text style={styles.buttonLabel}>A-B</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sliderContainer}>
        <Text style={styles.time}>01:27</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#ff0000"
          maximumTrackTintColor="#555"
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
          <Icon name="play-back-outline" size={48} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlayPause}>
          <Icon
            name={isPlaying ? 'pause-circle-outline' : 'play-circle-outline'}
            size={84}
            color="#ff0000"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="play-forward-outline" size={48} color="#fff" />
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
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
    marginTop: 20,
    marginBottom: 20,
  },
});

export default Player;
