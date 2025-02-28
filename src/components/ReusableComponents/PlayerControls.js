import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


// Shuffle, Back, Skip Back, Play/Pause etc buttons
const PlayerControls = ({buttons, iconColor = '#fff'}) => {
  return (
    <>
      {buttons.map((button, index) => (
        <TouchableOpacity key={index} onPress={button.onPress}>
          <Icon
            name={button.name}
            size={button.size}
            color={button.iconColor}
          />
        </TouchableOpacity>
      ))}
    </>
  );
};

export default PlayerControls;
