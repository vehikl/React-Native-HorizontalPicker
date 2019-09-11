import React, { useState } from 'react';
import { View, Text, FlatList, TouchableHighlight, StyleSheet } from 'react-native'

export default function HorizontalPicker(props) {
  const [selectedNumber, setSelectedNumber] = useState(props.initialValue);
  const { min, max } = props;
  const length = max - min + 1;
  const range = new Array(length).fill().map((_, index) => index + min);

  function updateSelectedNumber(item) {
    setSelectedNumber(item);
    props.onValueChange(item);
  }

  function renderItem({ item }) {
    let indicatorArrow;
    if (item === selectedNumber) {
      indicatorArrow = (<Text>^</Text>);
    }

    return (
      <TouchableHighlight onPress={() => updateSelectedNumber(item)}>
        <View style={styles.numberDisplay}>
          {indicatorArrow}
          <Text style={styles.numberText}>{item}</Text>
          <Text>|</Text>
        </View>
      </TouchableHighlight>
    );
  }

  function getInitialScrollIndex() {
    return range.findIndex((item) => item === props.initialValue - 3);
  }

  return (
    <View style={styles.container}>
      <View style={styles.selectionContainer}>
        <Text style={styles.selectedItem} testID="number">{selectedNumber}</Text>
        <Text style={styles.selectedLine} >|</Text>
      </View>
      <FlatList
        horizontal
        keyExtractor={(item, index) => `${item}-${index}`}
        data={range}
        renderItem={renderItem}
        getItemLayout={(data, index) => (
          { length: 60, offset: 60 * index, index }
        )}
        initialScrollIndex={getInitialScrollIndex()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  numberDisplay: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60
  },
  numberText: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  container: {
    width: '100%',
    backgroundColor: '#ff9966',
    borderRadius: 50,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingVertical: 80,
  },
  selectionContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selectedItem: {
    padding: 100,
    fontSize: 60,
    color: 'white',
    fontWeight: '800',
  },
});

HorizontalPicker.defaultProps = {
  onValueChange: () => { },
};
