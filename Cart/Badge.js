import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as BuildStyle from '../BuildStyle';

export class Badge extends React.Component {
  render() {
    const {
      number = 10,
      size = BuildStyle.fontNormal,
      isSelected = false,
    } = this.props;
    return (
      <View style={[styles.badgeCircle, { 
        height: size, borderRadius: size / 2, width: (number.toString().length * size), 
        backgroundColor: isSelected ? BuildStyle.colorRed : BuildStyle.colorLightGray,}]}>
        <Text style={[styles.badgeCount, { fontSize: size - 2 }]}>
          {number}
        </Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  badgeCount: {
    color: 'white',
  },
  badgeCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
