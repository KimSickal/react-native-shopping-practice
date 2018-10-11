import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as BuildStyle from '../BuildStyle';

import { Badge } from './Badge';

export class TapButton extends React.Component {
  render() {
    const {
      title = 'Cart',
      notiNumber = 0,
      tabNumber = 0,
      selectedTab = 1,
      onPress,
    } = this.props;
    let isSelected = (selectedTab == tabNumber);
    return (
        <TouchableOpacity onPress = {onPress}  style={[
          isSelected ? styles.tapSelected : styles.tapSelectedNot,
          styles.tap
        ]}>
          <Text style={[
            isSelected ? styles.tapTextSeltected : styles.tapTextSeltectedNot,
            styles.tapText
          ]}>
            {title}
          </Text>
          {(function () {
            if (notiNumber == 0) {
              return null
            }
            else {
              return <View style={{ margin: 5 }} ><Badge number={notiNumber} isSelected={isSelected} /></View>
            }
          })()}

        </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({

  tap: {
    paddingHorizontal: 10,
    height: 40,
    //marginRight:1,
    borderColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tapSelected: {
    backgroundColor: 'white',
    borderBottomColor: BuildStyle.colorGreen,
    borderBottomWidth: 3,
  },
  tapSelectedNot: {
    backgroundColor: 'white',
    borderBottomColor: BuildStyle.colorLightGray,
    borderBottomWidth: 1,
  },
  tapText: {
    //fontWeight: 'bold',
    fontSize: BuildStyle.fontNormal,
  },
  tapTextSeltected: {
    color: BuildStyle.colorGreen,
  },
  tapTextSeltectedNot: {
    color: BuildStyle.textColor,
  },
})
