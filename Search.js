import React from 'react';
import { StyleSheet, StatusBar, Text, View, ScrollView, SafeAreaView } from 'react-native';

import * as BuildStyle from './BuildStyle';

import { ShopContent } from './Cart/ShopContent';
import { Title } from './Search/Title';
import { SubTab } from './Search/SubTab';
import { TapButton } from './Cart/TapButton';


export class Search extends React.Component {
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
        <Title title='science'></Title>
        <View style={{
          flexDirection: 'row',
          //marginLeft:1,
        }}>
          <TapButton
            isSelected={true} 
            title = 'Courses' />
          <TapButton
            title='Textbooks' />
        </View>
        <SubTab />
        <ShopContent checkable={false} isSelected={true} />
        <ShopContent checkable={false} isSelected={false} />
        <ShopContent checkable={false} isSelected={false} />
        <ShopContent checkable={false} isSelected={true} />
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
