import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import HorizontalPicker from './horizontal-picker'

export default function App() {
  return (
    <HorizontalPicker min={1} max={10} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
