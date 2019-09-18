import React from 'react';
import {
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

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
      textAlign: 'center',
    },
  });
}

function ListItemNumber(props) {
  const { number, updateSelectedNumber, textColor } = props;
  const styles = createStyles({ textColor });

  return (
    <TouchableHighlight onPress={() => updateSelectedNumber(number)}>
      <View style={styles.numberDisplay}>
        <Text style={styles.numberText}>{number}</Text>
        <Text style={styles.numberText}>|</Text>
      </View>
    </TouchableHighlight>
  );
}

ListItemNumber.propTypes = {
  number: PropTypes.number.isRequired,
  updateSelectedNumber: PropTypes.func.isRequired,
  textColor: PropTypes.string,
};

ListItemNumber.defaultProps = {
  textColor: 'rgba(255, 255, 255, 0.8)',
};

export default ListItemNumber;
