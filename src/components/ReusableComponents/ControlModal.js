import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Slider from '@react-native-community/slider';
import IncrementButtonGroup from './IncrementButtonGroup';

const ControlModal = ({
  visible,
  onClose,
  onChangeValue,
  label,
  min,
  max,
  step,
  increments,
  value,
}) => {
  const handleValueChange = val => {
    onChangeValue(val);
  };

  const incrementValue = val => {
    onChangeValue(val);
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
              <IncrementButtonGroup
                increments={increments}
                onPress={incrementValue}
              />
              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={onClose}>
                  <Text style={styles.controlButtonText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.controlButton}
                  onPress={() => {
                    onChangeValue(0, true);
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
