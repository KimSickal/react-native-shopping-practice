import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FontAwesome, } from '@expo/vector-icons';
import * as BuildStyle from '../BuildStyle';


export class CheckCircle extends React.Component {
    render(){
        const {isSelected = false, margin = 0, size = 20} = this.props;
        return(
        <View style = {[
            isSelected ? {backgroundColor: BuildStyle.colorLightGreen} : {backgroundColor: BuildStyle.colorLightGray},
            {
                width: size, 
                height: size, 
                borderRadius: size/2, 
                marginHorizontal: margin,
                justifyContent: 'center',
                alignItems: 'center',
            }
            ]}>
            {(function(){
            if(isSelected){
                return (
                //<Text style = {[styles.checkCircleText, {fontSize : size * 0.6}]}>√</Text>
                <FontAwesome name = "check" style ={[styles.checkCircleText, {fontSize : size * 0.6}]}></FontAwesome>
                )
            }
            })()}
        </View>
        )
    }
}
  
const styles = StyleSheet.create({
    checkCircleText:{
    color: 'white',
    fontWeight: 'bold',
  },
})