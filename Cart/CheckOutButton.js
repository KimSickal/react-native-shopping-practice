import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as BuildStyle from '../BuildStyle';

import { CheckCircle } from './CheckCircle';
import { CenterizedText } from './CenterizedText';
import { PriceText } from './PriceText';

export class CheckOutButton extends React.Component {
    render(){
        const {
            totalFee = 3593,
            originFee = 0,
            discountFee = 0,
        } = this.props;
        return(
            <View style = {styles.checkOutButton}>
              <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 10}}>
                <View style = {{flexDirection: 'row', alignItems: 'center',}}>
                  <CheckCircle
                    margin = {BuildStyle.baseMargin}
                    isSelected = {true}
                    />
                  <Text style = {styles.checkOutButtonTextLarge}>3 Items</Text>
                </View>
                <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style = {styles.checkOutButtonTextLarge}>Total </Text>
                  <PriceText price = {3593} fontSize = {BuildStyle.fontLarge} color = {BuildStyle.colorLightGreen} />
                </View>
                {/*}
                <View style = {{flexDirection: 'row'}}>
                  <Text style = {styles.checkOutButtonTextSmall}>Original Fee: ${originFee}</Text>
                  <Text style = {styles.checkOutButtonTextSmall}> | Discount Fee: ${discountFee}</Text>
                </View>
                {*/}
              </View>
              <CenterizedText
                height = {60}
                width = {120}
                backgroundColor = {BuildStyle.colorLightGreen}
                text = 'Check Out'
                fontColor = 'white'
                fontSize = {BuildStyle.fontLarge}
                fontWeight = 'bold'
              />
              
            </View>
        )
    }
}
const styles = StyleSheet.create({
    checkOutButton:{
      flexDirection: 'row',
      marginTop:1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    checkOutButtonTextLarge:{
      fontSize: BuildStyle.fontLarge,
      //fontWeight: 'bold',
      color: BuildStyle.textColor,
    },
})