import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, PermissionsAndroid, Platform, StyleSheet } from 'react-native';
import Sound from 'react-native-sound';

const App = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    requestPermission();
    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, []);

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        console.log('Requesting permission...');
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs access to Storage data',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        console.log('Permission result:', granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('WRITE_EXTERNAL_STORAGE permission granted');
        } else {
          Alert.alert('WRITE_EXTERNAL_STORAGE permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const loadSound = () => {
    const newSound = new Sound('bellaciao.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      setSound(newSound);
    });
  };

  const playSound = () => {
    if (sound) {
      sound.setPitch(1.05);  // Set the pitch to 6 for testing
      sound.play(() => {
        console.log('Playback finished');
      });
      setIsPlaying(true);
    }
  };

  const pauseSound = () => {
    if (sound) {
      sound.pause();
      setIsPlaying(false);
    }
  };

  const stopSound = () => {
    if (sound) {
      sound.stop(() => {
        setIsPlaying(false);
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text>Offline Audio Player</Text>
      <Button title="Load Sound" onPress={loadSound} />
      <Button
        title="Play Sound"
        onPress={playSound}
        disabled={!sound || isPlaying}
      />
      <Button
        title="Pause Sound"
        onPress={pauseSound}
        disabled={!sound || !isPlaying}
      />
      <Button title="Stop Sound" onPress={stopSound} disabled={!sound} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default App;
