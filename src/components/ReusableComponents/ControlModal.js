import React, {useState} from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';

const ControlModal = ({
  visible,
  onClose,
  onChangeValue,
  initialLabel,
  min,
  max,
  step,
  increments,
  initialValue = 0,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleValueChange = val => {
    setValue(val);
    onChangeValue(val);
  };

  const incrementValue = increment => {
    let newValue = value + increment;
    if (newValue > max) newValue = max;
    if (newValue < min) newValue = min;
    setValue(newValue);
    onChangeValue(newValue);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.valueText}>
            {initialLabel} {value.toFixed(2)}
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={min}
            maximumValue={max}
            step={step}
            minimumTrackTintColor="#1fb28a"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#1fb28a"
            value={value}
            onValueChange={handleValueChange}
          />
          <View style={styles.buttonRow}>
            {increments.map(inc => (
              <TouchableOpacity
                key={inc}
                style={styles.button}
                onPress={() => incrementValue(inc)}>
                <Text style={styles.buttonText}>
                  {inc > 0 ? `+${inc}` : inc}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.controlButton} onPress={onClose}>
              <Text style={styles.controlButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => setValue(initialValue)}>
              <Text style={styles.controlButtonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#1c1c1c',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  valueText: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    width: '23%',
    margin: 5,
    backgroundColor: '#333',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  controlButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#555',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ControlModal;
