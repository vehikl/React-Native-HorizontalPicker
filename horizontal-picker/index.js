import React from 'react';
import { View, Text } from 'react-native'

export default function HorizontalPicker(props) {
  const { min, max } = props;
  const length = max - min + 1;
  const range = new Array(length).fill().map((_, index) => index + min);
  function renderTicker(range) {
    return range.map((number, index) => <Text key={`${number}_${index}`}>{number}</Text>);
  }

  return (
    <View>
      {renderTicker(range)}
    </View>
  )
}

