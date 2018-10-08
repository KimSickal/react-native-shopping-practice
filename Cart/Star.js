import React from 'react';
import { StyleSheet, View,  Text } from 'react-native';
import { Ionicons, } from '@expo/vector-icons';
import * as BuildStyle from '../BuildStyle';

export class Star extends React.Component {
    render(){
        const {
            score = 3,
            reviews = 132,
        } = this.props;
        var stars = [];
        var keyCounter = 0;
        for(var i = 0; i < score; i++){
          stars.push(<Ionicons name = 'md-star' style = {[styles.star, {color:BuildStyle.colorStar}]} key = {keyCounter++}/>);
        }
        for(var i = 5; i > score; i--){
          stars.push(<Ionicons name = 'md-star' style = {[styles.star, {color:BuildStyle.colorLightGray}]} key = {keyCounter++} />);
        }
        return(
          <View style = {{flexDirection:"row", alignItems: 'center'}} >
            {stars}
            <Text style = {styles.starText}> ({reviews})</Text>
          </View>
        )
    }
}
const styles = StyleSheet.create({
    star:{
      fontSize: BuildStyle.fontNormal,
    },
    starText:{
      fontSize: BuildStyle.fontSmall,
      color: BuildStyle.colorGray,
    },
})