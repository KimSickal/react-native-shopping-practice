import React from 'react';
import { StyleSheet, StatusBar, Text, View, ScrollView, SafeAreaView } from 'react-native';

import * as BuildStyle from './BuildStyle';

import { CheckOutButton } from './Cart/CheckOutButton';
import { ShopContentsScroll } from './Cart/ShopContentsScroll';
import { Title } from './Cart/Title';
import { TapButton } from './Cart/TapButton';


export class Shop extends React.Component {
  render() {
    return (
      <SafeAreaView style={[
        styles.container, {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          backgroundColor: BuildStyle.colorLightGray,
        }]}>
        <StatusBar
          backgroundColor='white' />
        <Title title='My Courses'></Title>
        <View style={{
          flexDirection: 'row',
          //marginLeft:1,
        }}>
          <TapButton
            notiNumber={10}
            isSelected={true} />
          <TapButton
            title='Purchased' />
        </View>
        <ShopContentsScroll/>
        <CheckOutButton totalFee='3,333' originFee='0' disountFee='0' />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: StatusBar.currentHeight,
  },
});
