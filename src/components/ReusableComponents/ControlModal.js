import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import Slider from '@react-native-community/slider';

const ControlModal = ({
  visible,
  onClose,
  onChangeValue,
  label,
  min,
  max,
  step,
  positiveIncrements=[+0.1, +0.25, +0.5, +1.0],
  negativeIncrements=[-0.1, -0.25, -0.5, -1.0],
  value,
}) => {
  const handleValueChange = val => {
    onChangeValue(false, false, val);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.valueText}>
                {label} {value.toFixed(2)}
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
                {/* {increments.map(inc => (
                  <TouchableOpacity
                    key={inc}
                    style={styles.button}
                    onPress={() => incrementValue(inc)}>
                    <Text style={styles.buttonText}>
                      {inc > 0 ? `+${inc}` : inc}
                    </Text>
                  </TouchableOpacity>
                ))} */}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => onChangeValue(false)}>
                  <Text>Down</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => onChangeValue(true)}>
                  <Text>Up</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={onClose}>
                  <Text style={styles.controlButtonText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => {
                    onChangeValue(false, true);
                  }}>
                  <Text style={styles.controlButtonText}>Reset</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
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
    justifyContent: 'space-between',
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
