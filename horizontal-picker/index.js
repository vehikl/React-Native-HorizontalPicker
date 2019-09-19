import React, { useState, useRef, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native'

import ListItemNumber from '../ListItemNumber';

const ITEM_WIDTH = 60;

export default function HorizontalPicker(props) {
  const [selectedNumber, setSelectedNumber] = useState(props.initialValue);
  const [componentWidth, setComponentWidth] = useState(0);
  const [listOffset, setListOffset] = useState(0);
  const { min, max } = props;
  const length = max - min + 1;
  const range = new Array(length).fill().map((_, index) => index + min);
  const styles = createStyles(props);

  useEffect(() => {
    updateSelectedNumber(selectedNumber)
  }, [listOffset])

  const onLayout = ({ nativeEvent }) => {
    const width = nativeEvent.layout.width;
    setComponentWidth(width);
    setListOffset((width / 2) - (ITEM_WIDTH / 2));
  };

  const flatListRef = useRef(null);

  function updateSelectedNumber(number) {
    setSelectedNumber(number);
    props.onValueChange(number);
    centerOnIndex(getSelectedIndexForNumber(number));
  }

  function centerOnIndex(index) {
    if (flatListRef.current && index > -1) {
      flatListRef.current.scrollToIndex({ index, viewPosition: 0.5 });
    }
  }

  function getSelectedIndexForNumber(number) {
    return range.findIndex(candidate => candidate === number);
  }

  function handleScrollEnd() {
    centerOnIndex(getSelectedIndexForNumber(selectedNumber));
  }

  const renderItem = ({ item }) => (
    <ListItemNumber
      number={item}
      textColor={props.textColor}
      updateSelectedNumber={updateSelectedNumber}
    />
  )

  const handleScroll = ({ nativeEvent }) => {
    const viewPortWidth = nativeEvent.layoutMeasurement.width;
    const contentOffsetX = nativeEvent.contentOffset.x;

    const halfOfViewport = viewPortWidth / 2;
    const middlepoint = contentOffsetX + halfOfViewport;

    const withoutOffset = middlepoint - listOffset;
    const calculatedIndex = Math.floor(withoutOffset / ITEM_WIDTH);

    const value = range[calculatedIndex];
    setSelectedNumber(value);
  }

  function getInitialScrollIndex() {
    return range.findIndex((item) => item === props.initialValue);
  }

  const flatlistSpacer = () => (<View style={{ width: listOffset }} />)

  const tacos = componentWidth / ITEM_WIDTH / 2;

  return (
    <View style={styles.container}>
      <View style={styles.selectionContainer}>
        <Text style={styles.selectedItem} testID="number">{selectedNumber}</Text>
        <Text style={styles.centerLine} >|</Text>
      </View>
      <FlatList
        ref={flatListRef}
        horizontal
        bounces={false}
        keyExtractor={(item, index) => `${item}-${index}`}
        data={range}
        renderItem={renderItem}
        onLayout={onLayout}
        onMomentumScrollEnd={handleScrollEnd}
        getItemLayout={(data, index) => (
          { length: ITEM_WIDTH, offset: listOffset + ITEM_WIDTH * index, index }
        )}
        initialScrollIndex={getInitialScrollIndex()}
        ListHeaderComponent={flatlistSpacer()}
        ListFooterComponent={flatlistSpacer()}
        onScroll={handleScroll}
      />
    </View>
  );
}

function createStyles({ backgroundColor, textColor }) {
  return StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: backgroundColor,
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
      color: textColor,
      fontWeight: '800',
    },
    centerLine: {
      paddingBottom: 50,
      color: textColor,
      fontWeight: '100',
      fontSize: 120,
    },
  });
}

HorizontalPicker.defaultProps = {
  backgroundColor: '#ff9966',
  textColor: 'rgba(255, 255, 255, 0.8)',
  onValueChange: () => { },
};
