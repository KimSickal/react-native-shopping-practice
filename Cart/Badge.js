import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as BuildStyle from '../BuildStyle';

export class Badge extends React.Component {
    render(){
        const {
            number = 10,
            size = BuildStyle.fontNormal,
        } = this.props;
        return(
            <View style = {[styles.badgeCircle, {height: size, borderRadius: size/2, width:(number.toString().length * size)}]}>
              <Text style = {[styles.badgeCount, {fontSize: size-2}]}>
                {number}
              </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    badgeCount:{
      color:'white',
    },
    badgeCircle:{
      backgroundColor: BuildStyle.colorRed,
      alignItems: 'center',
      justifyContent: 'center',
    },
})