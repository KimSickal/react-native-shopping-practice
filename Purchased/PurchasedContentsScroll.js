import React from 'react';
import { StyleSheet, StatusBar, Text, View, ScrollView, } from 'react-native';

import * as BuildStyle from '../BuildStyle';

import { ShopContentsCategory } from '../Cart/ShopContentsCategory';
import { ShopContentsUnderCategory } from '../Cart/ShopContentsUnderCategory';
import { SubTab } from '../Search/SubTab';

import { data } from '../Cart/DummyShopInfo';


export class PurchasedContentsScroll extends React.Component {
  componentWillMount() {
    let tempData = data;
    Object.keys(tempData).map((categoryIndex) => {
      Object.keys(tempData[categoryIndex].shopContents).map((contentIndex) => {
        (tempData[categoryIndex].shopContents[contentIndex]).isSelected = true;
        (tempData[categoryIndex].shopContents[contentIndex]).checkable = false;
        (tempData[categoryIndex].shopContents[contentIndex]).isHided = false;
      })
    });
    this.setState({
      dict: tempData,
    })
  }
  render() {
    var headerIndices = []
    for (var i = 0; i < this.state.dict.length; i++) {
      headerIndices.push(2 * i + 1);
    }
    var scrollItems = [];
    var keyCounter = 0;
    function listWithCategories(categoryName, shopContents, numItems) {
      scrollItems.push(
        <ShopContentsCategory
          categoryName={categoryName}
          key={keyCounter++}
          numItems={numItems} 
          checkable = {false}/>);
      scrollItems.push(
        <ShopContentsUnderCategory
          data={shopContents}
          key={keyCounter++}
          checkable = {false}/>);
    }
    var numEachCategory = [];
    Object.keys(this.state.dict).map((categoryNumber) => {
      var numForCategory = 0;
      for (i = 0; i < this.state.dict[categoryNumber].shopContents.length; i++) {
        if (!this.state.dict[categoryNumber].shopContents[i].isHided) {
          numForCategory++;
        }
      }
      numEachCategory.push(numForCategory);
    })
    for (var i = 0; i < this.state.dict.length; i++) {
      if (numEachCategory[i] > 0) {
        listWithCategories(
          categoryName = this.state.dict[i].categoryName,
          shopContents = this.state.dict[i].shopContents,
          numItems = numEachCategory[i],
        );
      }
    }
    return (
      <ScrollView
        stickyHeaderIndices={headerIndices}>
        <SubTab />
        {scrollItems}
      </ScrollView>
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
