import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as BuildStyle from '../BuildStyle';

export class SubTab extends React.Component {
  render() {
    const {
      categoryNames = ['1st Grade', 'English', 'Popularity']
    } = this.props;
    return (
      <View style = {styles.subTab}>
        {
          Object.keys(categoryNames).map((category, i) => {
            return(
              <View style ={[
                styles.tab,
                (category == categoryNames.length)?null:styles.tabDevider
                ]} key = {i}>
                <Text style = {styles.tabText}>
                  {categoryNames[category]}{' '}
                </Text>
                <Ionicons name = 'md-arrow-dropdown' style = {styles.tabText}/>
              </View>
            )

          })
        }
      </View>
    )
  }
}
/*
function tab({

}){
  return(
    <View style = {styles.subTab}>
      <Text style = {styles.categoryText}></Text>
    </View>
  )
}*/
const styles = StyleSheet.create({
  subTab:{
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: BuildStyle.colorLightGray,
  },
  tab:{
    flex:1,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
  },
  tabDevider:{
    borderRightWidth: 1,
    borderRightColor: BuildStyle.colorLightGray,
  },
  tabText:{
    fontSize: BuildStyle.fontNormal,
    color: BuildStyle.colorGray,
  } 
})
