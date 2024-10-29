import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PlayerControls = ({ buttons, iconColor = "#fff" }) => {
  return (
    <>
      {buttons.map((button, index) => (
        <TouchableOpacity key={index} onPress={button.onPress}>
          <Icon name={button.name} size={button.size} color={iconColor} />
        </TouchableOpacity>
      ))}
      </>
  );
};

export default PlayerControls;
