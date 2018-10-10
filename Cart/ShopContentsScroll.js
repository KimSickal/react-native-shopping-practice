import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as BuildStyle from '../BuildStyle';

import { CheckCircle } from './CheckCircle';
import { PriceText } from './PriceText';
import { ShopContent } from './ShopContent';
import { data } from './DummyShopInfo';

let priceShipping = 560
let priceDiscount = 200

export class ShopContentsScroll extends React.Component {
  constructor(props){
    super(props);
    this.state = {dict: data};
    this.selectFromDict = this.selectFromDict.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.deSelectAll = this.deSelectAll.bind(this);
  }
  componentWillMount(){
    this.setState({
      dict: data,
    })
  }
  selectFromDict(categoryIndex) {
    let tempData = this.state.dict;
    return (contentIndex) => {
      return () => {
        tempData[categoryIndex].shopContents[contentIndex].isSelected = !tempData[categoryIndex].shopContents[contentIndex].isSelected;
        this.setState({ dict: tempData});
      }
    }
  }
  deleteFromDict(categoryIndex) {
    let tempData = this.state.dict;
    return (contentIndex) => {
      return () => {
        delete tempData[categoryIndex].shopContents[contentIndex];
        this.setState({ dict: tempData});
      }
    }
  }
  selectAll(){
    let tempData = this.state.dict;
    Object.keys(tempData).map((categoryIndex)=>{
      Object.keys(tempData[categoryIndex].shopContents).map((contentIndex)=>{
        tempData[categoryIndex].shopContents[contentIndex].isSelected = true
      })
    })
    this.setState({dict: tempData});
  }
  deSelectAll(){
    let tempData = this.state.dict;
    Object.keys(tempData).map((categoryIndex)=>{
      Object.keys(tempData[categoryIndex].shopContents).map((contentIndex)=>{
        tempData[categoryIndex].shopContents[contentIndex].isSelected = false
      })
    })
    this.setState({dict: tempData});
  }
  render() {
    var headerIndices = []
    for (var i = 0; i < this.state.dict.length; i++) {
      headerIndices.push(2 * i + 1);
    }
    var scrollItems = [];
    var keyCounter = 0;
    function listWithCategories(categoryName, shopContents, toggleFunctionFunction) {
      scrollItems.push(
        <ShopContentsCategory
          categoryName={categoryName}
          key={keyCounter++}
          numItems={shopContents.length} />);
      scrollItems.push(
        <ShopContentsUnderCategory
          toggleFunction={toggleFunctionFunction}
          data={shopContents}
          key={keyCounter++} />);
    }
    for (var i = 0; i < this.state.dict.length; i++) {
      listWithCategories(
        categoryName = this.state.dict[i].categoryName,
        shopContents = this.state.dict[i].shopContents,
        toggleFunctionFunction = this.selectFromDict(i).bind(),
      );
    }
    var numTotal = 0;
    var numSelected = 0;
    var priceTotal = 0;
    var priceEachCategory = {};
    Object.keys(this.state.dict).map((categoryNumber, keyCounter) => {
      var priceForCategory = 0;
      for (i = 0; i < this.state.dict[categoryNumber].shopContents.length; i++) {
        numTotal++;
        if (this.state.dict[categoryNumber].shopContents[i].isSelected) {
          numSelected++;
          priceForCategory += this.state.dict[categoryNumber].shopContents[i].price;
        };
      }
      priceEachCategory[this.state.dict[categoryNumber].categoryName] = priceForCategory;
      priceTotal += priceForCategory;
    })
    console.log(numTotal, numSelected);
    return (
      <ScrollView
        stickyHeaderIndices={headerIndices}>
        <SelectedCourses 
          numTotal={numTotal} 
          numSelected={numSelected} 
          functionSelectAll={this.selectAll}
          functionDeselectAll={this.deSelectAll}
          isSelectedAll = {numTotal == numSelected} />
        {scrollItems}
        <ShopContentsCalculation
          fees={priceEachCategory}
          totalFee={priceTotal}
          discountFee={priceDiscount}
          shipingFee={priceShipping} />
      </ScrollView>
    )
  }
}



function ShopContentsCategory({
  categoryName = 'Courses',
  numItems = 3,
}) {
  return (
    <View style={styles.totalCourses}>
      <Ionicons name="md-cart" size={30} style={{ color: BuildStyle.colorLightGreen, marginLeft: BuildStyle.baseMargin - 2, marginRight: BuildStyle.baseMargin - 3 }} />
      <Text style={styles.totalCoursesText}>{categoryName}: </Text>
      <Text style={[styles.totalCoursesText, { fontWeight: 'bold', color: BuildStyle.textColor }]}>{numItems}</Text>
    </View>
  )
}

function ShopContentsCalculation({
  fees = {
    "Course": 2222,
    "Textbook": 1111,
  },
  shippingFee = 560,
  discountFee = -200,
  totalFee = 3593,
}) {
  return (
    <View style={styles.shopContentsCalculation} >
      {
        Object.keys(fees).map((categoryName, keyCounter) => {
          return (
            <ShopContentsCalculationCategory
              categoryName={categoryName}
              categoryFee={fees[categoryName]}
              key={keyCounter} />
          )
        })
      }
      <ShopContentsCalculationCategory categoryName='Shipping' categoryFee={shippingFee} />
      <View style={{ height: 1, backgroundColor: BuildStyle.colorLightGray, flex: 1 }} />
      <ShopContentsCalculationCategory categoryName='Discount' categoryFee={discountFee} />
      <View style={{ height: 1, backgroundColor: BuildStyle.colorLightGray, flex: 1 }} />
      <ShopContentsCalculationCategory categoryName='Total' categoryFee={totalFee + shippingFee - discountFee} />
    </View>
  )
}

function ShopContentsCalculationCategory({
  categoryName = 'Course',
  categoryFee = 1111,
}) {
  return (
    <View style={styles.shopContentsCulationCategory}>
      <Text style={styles.shopContentsCalculationCategoryText}>{categoryName}</Text>
      <PriceText price={categoryFee} fontSize={BuildStyle.fontLarge} />
    </View>
  )
}

function ShopContentsUnderCategory({
  data,
  toggleFunction,
}) {
  return (
    <View>
      {
        Object.keys(data).map((contentKey, keyCounter) => {
          var content = data[contentKey];
          return (
            <ShopContent
              cName={content.name}
              cDate={content.date}
              cPrice={content.price}
              star={content.star}
              reviews={content.review}
              checkable={true}
              key={keyCounter}
              isSelected={content.isSelected}
              onPress={toggleFunction(contentKey)} />
          )
        })
      }
      <View style={styles.division} />
    </View>
  )
}

function SelectedCourses({
  numTotal = 10,
  numSelected = 3,
  functionSelectAll,
  functionDeselectAll,
  functionDeleteSelected,
  isSelectedAll,
}) {
  return (
    <View style={styles.selectedCourses}>
      <TouchableOpacity onPress = {isSelectedAll? functionDeselectAll:functionSelectAll}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CheckCircle margin={BuildStyle.baseMargin} isSelected = {isSelectedAll} />
          <Text style={styles.selectedCoursesText}>{isSelectedAll?'Deselect':'Select'} All ({numSelected} / {numTotal})
            </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name='md-trash' size={30} style={{ color: BuildStyle.colorLightGray, margin: 5, marginRight: BuildStyle.baseMargin - 5 }} />
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({

  totalCourses: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderBottomColor: BuildStyle.colorLightGray,
    borderBottomWidth: 1,
    height: 40,
  },
  totalCoursesText: {
    fontSize: BuildStyle.fontNormal,
    color: BuildStyle.textColor,
  },

  selectedCourses: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    //paddingRight: BuildStyle.baseMargin,
    marginBottom: 1,
    height: 40,
  },
  selectedCoursesText: {
    fontSize: BuildStyle.fontNormal,
    color: 'gray',
  },



  division: {
    height: 10,
    borderTopWidth: 5,
    borderTopColor: 'white',
  },

  shopContentsCalculation: {
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: BuildStyle.baseMargin,

  },
  shopContentsCulationCategory: {
    //paddingHorizontal: BuildStyle.baseMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  shopContentsCalculationCategoryText: {
    fontSize: BuildStyle.fontNormal,
    color: BuildStyle.textColor,
  },

})
