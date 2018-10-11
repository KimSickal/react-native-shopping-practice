import React from 'react';
import { StyleSheet, View, ScrollView, } from 'react-native';

import * as BuildStyle from '../BuildStyle';

import { ShopContentsCategory } from '../Cart/ShopContentsCategory';
import { ShopContentsUnderCategory } from '../Cart/ShopContentsUnderCategory';
import { SubTab } from '../Search/SubTab';

import { data } from '../Cart/DummyShopInfo';

import { categoryData } from './DummyCategoryInfo';


export class PurchasedContentsScroll extends React.Component {
  constructor(props) {
    super(props);
    this.categoryHandler = this.categoryHandler.bind(this);
  }
  componentWillMount() {
    let tempData = data;
    let tempIndices = []
    Object.keys(tempData).map((categoryIndex) => {
      tempIndices.push(0);
      Object.keys(tempData[categoryIndex].shopContents).map((contentIndex) => {
        (tempData[categoryIndex].shopContents[contentIndex]).isSelected = true;
        (tempData[categoryIndex].shopContents[contentIndex]).checkable = false;
        (tempData[categoryIndex].shopContents[contentIndex]).isHided = false;
      })
    });
    this.setState({
      dict: tempData,
      selectedIndices: tempIndices,
    })
  }
  categoryHandler(index1) {
    return (index2) => {
      return () => {
        let tempIndices = this.state.selectedIndices;
        tempIndices[index1] = index2;
        this.setState({ selectedIndices: tempIndices });
      }
    }
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
          checkable={false} />);
      scrollItems.push(
        <ShopContentsUnderCategory
          data={shopContents}
          key={keyCounter++}
          checkable={false} />);
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
      <View style={{ flex: 1 }}>
        <ScrollView
          stickyHeaderIndices={headerIndices}>
          <SubTab categoryData={categoryData} selectedIndices={this.state.selectedIndices} handler={this.categoryHandler} />
          {scrollItems}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabs: {
    flex: 1,
    height: 80,
  },
  scrolls: {
    borderBottomWidth: 1,
    borderBottomColor: BuildStyle.colorLightGray,
  }
})
