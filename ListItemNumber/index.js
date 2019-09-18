import React from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';


function ListItemNumber(props) {
  const {item, selectedNumber, updateSelectedNumber} = props
  let indicatorArrow;
  if (item === selectedNumber) {
    indicatorArrow = (<Text>^</Text>);
  }

  return (
    <TouchableHighlight onPress={() => updateSelectedNumber({ item })}>
      <View style={styles.numberDisplay}>
        {indicatorArrow}
        <Text style={styles.numberText}>{item}</Text>
        <Text style={styles.numberText}>|</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  numberDisplay: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.8)',
    width: 60,
    textAlign: "center"
  },
})

export default ListItemNumber