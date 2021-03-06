import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import HorizontalPicker from './horizontal-picker'
console.disableYellowBox = true;

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <HorizontalPicker
        min={1}
        max={50}
        initialValue={11}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // width:250,
  },
});
