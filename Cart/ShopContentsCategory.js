import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import * as BuildStyle from '../BuildStyle';

export class ShopContentsCategory extends React.Component {
  render() {
    const {
      categoryName = 'Courses',
      numItems = 3,
      checkable = true,
    } = this.props
    return (
      <View style={styles.totalCourses}>
        <Ionicons name={checkable?"md-cart":'md-download'} size={30} style={[{ color: BuildStyle.colorLightGreen, },
        checkable ?
          { marginLeft: BuildStyle.baseMargin - 2, marginRight: BuildStyle.baseMargin - 3 } :
          { marginLeft: BuildStyle.baseMargin+5, marginRight: BuildStyle.baseMargin+11}]} />
        <Text style={styles.totalCoursesText}>{categoryName}: </Text>
        <Text style={[styles.totalCoursesText, { fontWeight: 'bold', color: BuildStyle.textColor }]}>{numItems}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  totalCourses: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderBottomColor: BuildStyle.colorLightGray,
    borderBottomWidth: 1,
    height: 40,
  },
  totalCoursesText: {
    fontSize: BuildStyle.fontNormal,
    color: BuildStyle.textColor,
  },
})
