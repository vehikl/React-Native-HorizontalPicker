import React from 'react';
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native';

function ListItemNumber(props) {
  const { updateSelectedNumber } = props;
  const number = props.number;
  const styles = createStyles(props);

  return (
    <TouchableHighlight onPress={() => updateSelectedNumber({ item: number })}>
      <View style={styles.numberDisplay}>
        <Text style={styles.numberText}>{number}</Text>
        <Text style={styles.numberText}>|</Text>
      </View>
    </TouchableHighlight>
  );
}
function createStyles({ textColor }) {
  return StyleSheet.create({
    numberDisplay: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    numberText: {
      fontSize: 24,
      color: textColor,
      width: 60,
      textAlign: "center"
    },
  });
}

ListItemNumber.defaultProps = {
  textColor: 'rgba(255, 255, 255, 0.8)'
}

export default ListItemNumber