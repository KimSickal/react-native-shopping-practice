import React from 'react';
import { StyleSheet, StatusBar, Text, View, ScrollView, SafeAreaView } from 'react-native';

import * as BuildStyle from './BuildStyle';

import { ShopContentsScroll } from './Cart/ShopContentsScroll';
import { PurchasedContentsScroll } from './Purchased/PurchasedContentsScroll';
import { Title } from './Cart/Title';
import { TapButton } from './Cart/TapButton';


export class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.changeTab = this.changeTab.bind(this);
  }
  componentWillMount() {
    this.setState({
      selectedTab: 1,
    })
  }
  changeTab(tabNumber) {
    return () => {
      if (this.state.selectedTab != tabNumber) {
        this.setState({ selectedTab: tabNumber })
      }
    }
  }
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
        }}>
          <TapButton
            notiNumber={10}
            title='Cart'
            tabNumber={0}
            selectedTab={this.state.selectedTab} 
            onPress = {this.changeTab(0)}/>
          <TapButton
            title='Purchased'
            tabNumber={1}
            selectedTab={this.state.selectedTab}
            onPress = {this.changeTab(1)} />
        </View>
        {
          this.state.selectedTab == 0 ?
          <ShopContentsScroll/>:
          <PurchasedContentsScroll />
        }
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
