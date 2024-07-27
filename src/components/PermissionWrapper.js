import React, { useEffect, useState } from 'react';
import { View, Text, Platform, PermissionsAndroid } from 'react-native';

const PermissionWrapper = ({ children }) => {
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        if (Platform.OS === 'android') {
          if (Platform.Version >= 33) { // Android 13 and above
            const readMediaAudioPermission = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
              {
                title: 'Read Media Audio Permission',
                message: 'This app needs access to read audio files.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              }
            );
            setPermissionsGranted(readMediaAudioPermission === PermissionsAndroid.RESULTS.GRANTED);
          } else { // Android 12 and below
            const readPermission = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
              {
                title: 'Read External Storage Permission',
                message: 'This app needs access to read external storage.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              }
            );
            setPermissionsGranted(readPermission === PermissionsAndroid.RESULTS.GRANTED);
          }
        } else {
          setPermissionsGranted(true); // Non-Android platforms
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestPermissions();
  }, []);

  if (!permissionsGranted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Requesting permissions...</Text>
      </View>
    );
  }

  return children;
};

export default PermissionWrapper;
