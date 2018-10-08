import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as BuildStyle from '../BuildStyle';

export class Title extends React.Component {
  render() {
    const {
      title = 'Title of Page'
    } = this.props;
    return (
      <View style={styles.title}>
        <Ionicons name="md-arrow-back" style={styles.titleIcons} />
        <View style={styles.searchField} >
          <Text style={styles.searchText}>
            {title}
          </Text>
          <Ionicons name="md-search" style={styles.titleIcons} />
        </View>
        <Ionicons name="md-cart" style={styles.titleIcons} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  title: {
    height: 45,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  searchField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: BuildStyle.baseMargin,
    borderBottomWidth: 1,
    height: 30,
    borderBottomColor: BuildStyle.colorGray,
  },
  searchText: {
    //fontWeight: 'bold',
    fontSize: BuildStyle.fontTitle,
    color: BuildStyle.textColor,
    //color:'#1f1f1f',
  },
  titleIcons: {
    fontSize: BuildStyle.fontTitle * 1.2,
    color: BuildStyle.textColor,
  },
})
