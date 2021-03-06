import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as BuildStyle from '../BuildStyle';

import { CheckCircle } from './CheckCircle';
import { CenterizedText } from './CenterizedText';
import { Star } from './Star';
import { PriceText } from './PriceText';

export class ShopContent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.setState({
      name: 'www',
    })
  }
  render() {
    const {
      cName = 'Name of Content',
      cDate = 'DD-MM-YYYY',
      cPrice = 1111,
      isSelected = false,
      star = 2,
      reviews = 112,
      checkable = true,
      onPressCheck = (() => { }),
      onPressDelete,
    } = this.props;
    return (
      <View style={[styles.shopContent, isSelected ? styles.shopContentSelected : styles.shopContentSelectedNot]}>
        <TouchableOpacity onPress={onPressCheck} style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          {checkable ?
            <CheckCircle margin={BuildStyle.baseMargin} isSelected={isSelected} /> :
            <View style={{ width: 5 }} />}
          <CenterizedText
            text='image'
            fontColor='white'
            backgroundColor='gray'
            width={60}
            height={60}
          />
          <View style={styles.shopSummary}>
            <View style={styles.shopText}>
              <Text
                numberOfLines={1}
                style={styles.shopTextTitle}>
                {cName}
              </Text>
              <Star score={star} reviews={reviews} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {((!checkable) && isSelected) ?
                  <Text style={styles.shopTextSummary}>Purchased</Text> :
                  <PriceText price={cPrice}></PriceText>}
                <Text
                  numberOfLines={1}
                  style={[{ textAlign: 'right' }, styles.shopTextSummary]}>
                  {cDate}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressDelete}>
          <Ionicons
            name={
              checkable ? 'md-close' : (
                isSelected ? 'md-play' : 'md-cart'
              )
            } size={20} style={{ color: BuildStyle.colorLightGray, marginHorizontal: BuildStyle.baseMargin }} />
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  shopContent: {
    marginTop: 0,
    marginBottom: 0,
    height: 65,
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  shopContentSelected: {
    backgroundColor: 'white',
  },
  shopContentSelectedNot: {
    backgroundColor: 'white',
  },
  shopSummary: {
    flex: 1,
  },
  shopText: {
    paddingLeft: 10,
    flex: 1,
    height: 80,
    justifyContent: 'center',
  },
  shopTextSummary: {
    color: 'gray',
  },
  shopTextTitle: {
    color: BuildStyle.textColor,
    fontSize: BuildStyle.fontLarge,
  },

})
