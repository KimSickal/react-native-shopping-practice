import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as BuildStyle from '../BuildStyle';

import { CheckCircle } from './CheckCircle';
import { CenterizedText } from './CenterizedText';
import { PriceText } from './PriceText';

export class CheckOutButton extends React.Component {
  render() {
    const {
      totalFee = 0,
      numSelected = 0,
      onPress = () => console.log('aa'),
    } = this.props;
    return (
      <View style={styles.checkOutButton}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <CheckCircle
              margin={BuildStyle.baseMargin}
              isSelected={numSelected > 0}
            />
            <Text style={styles.checkOutButtonTextLarge}>{numSelected} Items</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.checkOutButtonTextLarge}>Total </Text>
            <PriceText price={(numSelected > 0) ? totalFee : 0} fontSize={BuildStyle.fontLarge} color={BuildStyle.colorLightGreen} />
          </View>
          {/*}
                <View style = {{flexDirection: 'row'}}>
                  <Text style = {styles.checkOutButtonTextSmall}>Original Fee: ${originFee}</Text>
                  <Text style = {styles.checkOutButtonTextSmall}> | Discount Fee: ${discountFee}</Text>
                </View>
                {*/}
        </View>
        <TouchableOpacity onPress={onPress}>
          <CenterizedText
            height={60}
            width={120}
            backgroundColor={BuildStyle.colorLightGreen}
            text='Purchase'
            fontColor='white'
            fontSize={BuildStyle.fontLarge}
            fontWeight='bold'
          />
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  checkOutButton: {
    flexDirection: 'row',
    marginTop: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  checkOutButtonTextLarge: {
    fontSize: BuildStyle.fontLarge,
    //fontWeight: 'bold',
    color: BuildStyle.textColor,
  },
})
