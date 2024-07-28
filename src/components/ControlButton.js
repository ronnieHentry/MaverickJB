import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export const ControlButton = ({label, isActive, onPress}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{isActive ? 'ON' : 'OFF'}</Text>
    <View style={[styles.bar, isActive && styles.barOn]} />
    <Text style={styles.buttonLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
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
});
