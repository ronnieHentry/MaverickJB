import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, FlatList} from 'react-native';

const IncrementButtonGroup = ({increments, onPress}) => {
  const renderButton = ({item}) => (
    <TouchableOpacity style={styles.button} onPress={() => onPress(item)}>
      <Text style={styles.buttonText}>{item > 0 ? `+${item}` : item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={increments.negative}
        renderItem={renderButton}
        keyExtractor={item => `neg-${item}`}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
      <FlatList
        data={increments.positive}
        renderItem={renderButton}
        keyExtractor={item => `pos-${item}`}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
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
});

export default IncrementButtonGroup;
