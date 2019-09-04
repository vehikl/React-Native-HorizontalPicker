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
    return (
      <TouchableHighlight onPress={() => updateSelectedNumber(item)}>
        <Text style={{ padding: 3 }}>{item}</Text>
      </TouchableHighlight>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.selectedItem} testID="number">{selectedNumber}</Text>
      <FlatList
        horizontal
        keyExtractor={(item, index) => `${item}-${index}`}
        data={range}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  selectedItem: {

  },
});

HorizontalPicker.defaultProps = {
  onValueChange: () => { },
};
