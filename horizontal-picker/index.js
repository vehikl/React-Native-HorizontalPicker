import React, { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, TouchableHighlight, StyleSheet } from 'react-native'

const LIST_OFFSET = 180;
const ITEM_WIDTH = 60;

export default function HorizontalPicker(props) {
  const [selectedNumber, setSelectedNumber] = useState(props.initialValue);
  const { min, max } = props;
  const length = max - min + 1;
  const range = new Array(length).fill().map((_, index) => index + min);

  const flatListRef = useRef(null);

  function updateSelectedNumber(foo) {
    setSelectedNumber(foo.item);
    props.onValueChange(foo.item);
    const index = range.findIndex((number) => number === foo.item);

    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, viewPosition: 0.5});
    }
  }

  function renderItem({ item }) {
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

  function getInitialScrollIndex() {
    return range.findIndex((item) => item === props.initialValue);
  }

  const flatlistSpacer = () => (<View style={{ width: LIST_OFFSET }} />)

  return (
    <View style={styles.container}>
      <View style={styles.selectionContainer}>
        <Text style={styles.selectedItem} testID="number">{selectedNumber}</Text>
        <Text style={styles.centerLine} >|</Text>
      </View>
      <FlatList
        ref={flatListRef}
        horizontal
        keyExtractor={(item, index) => `${item}-${index}`}
        data={range}
        renderItem={renderItem}
        getItemLayout={(data, index) => (
          { length: ITEM_WIDTH, offset: LIST_OFFSET + ITEM_WIDTH * index, index }
        )}
        initialScrollIndex={getInitialScrollIndex() - 3}
        ListHeaderComponent={flatlistSpacer()}
        ListFooterComponent={flatlistSpacer()}
      />
    </View>
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

  },
  selectedItem: {
    paddingTop: 80,
    fontSize: 60,
    color: 'white',
    fontWeight: '800',
  },
  centerLine: {
    paddingBottom: 50,
    color: 'white',
    fontWeight: '100',
    fontSize: 120,
  },
});

HorizontalPicker.defaultProps = {
  onValueChange: () => { },
};
