import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as BuildStyle from '../BuildStyle';

export class Title extends React.Component {
    render(){
        const {
            title = 'Title of Page'
        } = this.props;
        return(
            <View style = {styles.title}>
              <Ionicons name = "md-arrow-back" style = {styles.titleIcons}/>
              <Text style = {styles.titleText}>
                {title}
              </Text>
              <Ionicons name = "md-menu" style = {styles.titleIcons}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
  title:{
    height:45,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  titleText:{
    //fontWeight: 'bold',
    fontSize: BuildStyle.fontTitle,
    color: BuildStyle.textColor,
    //color:'#1f1f1f',
  },
  titleIcons:{
    fontSize: BuildStyle.fontTitle * 1.2,
    color: BuildStyle.textColor,
  },
})