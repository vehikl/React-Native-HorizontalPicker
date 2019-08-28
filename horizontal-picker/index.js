import React from 'react';
import { View, Text, FlatList } from 'react-native'

export default function HorizontalPicker(props) {
  const { min, max } = props;
  const length = max - min + 1;
  const range = new Array(length).fill().map((_, index) => index + min);

  function renderItem({ item }) {
    return (<Text style={{ padding: 3 }}>{item}</Text>);
  }

  return (
    <View style={{width: '100%'}}>
      <FlatList
        horizontal
        keyExtractor={(item, index) => `${item}-${index}`}
        data={range}
        renderItem={renderItem}
      />
    </View>
  )
}

