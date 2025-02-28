import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ToggleButtons = ({ buttons }) => (
  <View style={styles.buttonRow}>
    {buttons.map(({ label, isActive, onPress }) => (
      <TouchableOpacity
        key={label}
        style={styles.button}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{isActive ? 'ON' : 'OFF'}</Text>
        <View style={[styles.bar, isActive && styles.barOn]} />
        <Text style={styles.buttonLabel}>{label}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
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
    fontSize: 10,
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
});

export default ToggleButtons;

