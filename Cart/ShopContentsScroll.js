import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as BuildStyle from '../BuildStyle';

import { CheckOutButton } from './CheckOutButton';
import { CheckCircle } from './CheckCircle';
import { PriceText } from './PriceText';
import { ShopContentsUnderCategory } from './ShopContentsUnderCategory';
import { ShopContentsCategory } from './ShopContentsCategory';

import { data } from './DummyShopInfo';

let priceShipping = 560
let priceDiscount = 200

export class ShopContentsScroll extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dict: data };
    this.selectFromDict = this.selectFromDict.bind(this);
    this.deleteFromDict = this.deleteFromDict.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.deSelectAll = this.deSelectAll.bind(this);
    this.deleteSelected = this.deleteSelected.bind(this);
    this.alertDeletion = this.alertDeletion.bind(this);
    this.refreshAll = this.refreshAll.bind(this);
  }
  componentWillMount() {
    let tempData = data;
    Object.keys(tempData).map((categoryIndex) => {
      Object.keys(tempData[categoryIndex].shopContents).map((contentIndex) => {
        (tempData[categoryIndex].shopContents[contentIndex]).isSelected = false;
        (tempData[categoryIndex].shopContents[contentIndex]).isHided = false;
      })
    });
    this.setState({
      dict: tempData,
    })
  }
  selectFromDict(categoryIndex) {
    let tempData = this.state.dict;
    return (contentIndex) => {
      return () => {
        tempData[categoryIndex].shopContents[contentIndex].isSelected = !tempData[categoryIndex].shopContents[contentIndex].isSelected;
        this.setState({ dict: tempData });
      }
    }
  }
  deleteFromDict(categoryIndex) {
    let tempData = this.state.dict;
    return (contentIndex) => {
      return () => {
        tempData[categoryIndex].shopContents[contentIndex].isHided = true;
        this.setState({ dict: tempData });
      }
    }
  }
  selectAll() {
    let tempData = this.state.dict;
    Object.keys(tempData).map((categoryIndex) => {
      Object.keys(tempData[categoryIndex].shopContents).map((contentIndex) => {
        tempData[categoryIndex].shopContents[contentIndex].isSelected = true
      })
    })
    this.setState({ dict: tempData });
  }
  deSelectAll() {
    let tempData = this.state.dict;
    Object.keys(tempData).map((categoryIndex) => {
      Object.keys(tempData[categoryIndex].shopContents).map((contentIndex) => {
        tempData[categoryIndex].shopContents[contentIndex].isSelected = false
      })
    })
    this.setState({ dict: tempData });
  }
  deleteSelected() {
    let tempData = this.state.dict;
    Object.keys(tempData).map((categoryIndex) => {
      Object.keys(tempData[categoryIndex].shopContents).map((contentIndex) => {
        if ((!tempData[categoryIndex].shopContents[contentIndex].isHided)
          && tempData[categoryIndex].shopContents[contentIndex].isSelected) {
          tempData[categoryIndex].shopContents[contentIndex].isHided = true
        }
      })
    })
    this.setState({ dict: tempData });
  }
  alertDeletion(numSelected) {
    return () => {
      if (numSelected > 0)
        Alert.alert(
          title = 'Delete Items',
          message = 'Are you sure to delete ' + numSelected + ' items?',
          [
            { text: 'Cancel' },
            { text: 'Delete', onPress: this.deleteSelected },
          ]
        )
    }
  }
  refreshAll() { //// 디버그용 함수
    let tempData = this.state.dict;
    Object.keys(tempData).map((categoryIndex) => {
      Object.keys(tempData[categoryIndex].shopContents).map((contentIndex) => {
        tempData[categoryIndex].shopContents[contentIndex].isHided = false
      })
    })
    this.setState({ dict: tempData });
  }

  render() {
    var headerIndices = []
    for (var i = 0; i < this.state.dict.length; i++) {
      headerIndices.push(2 * i + 1);
    }
    var scrollItems = [];
    var keyCounter = 0;
    function listWithCategories(categoryName, shopContents, toggleFunction, deleteFunction, numItems) {
      scrollItems.push(
        <ShopContentsCategory
          categoryName={categoryName}
          key={keyCounter++}
          numItems={numItems} />);
      scrollItems.push(
        <ShopContentsUnderCategory
          toggleFunction={toggleFunction}
          deleteFunction={deleteFunction}
          data={shopContents}
          key={keyCounter++} />);
    }
    var numTotal = 0;
    var numSelected = 0;
    var priceTotal = 0;
    var numEachCategory = [];
    var priceEachCategory = {};
    Object.keys(this.state.dict).map((categoryNumber, keyCounter) => {
      var priceForCategory = 0;
      var numForCategory = 0;
      for (i = 0; i < this.state.dict[categoryNumber].shopContents.length; i++) {
        if (!this.state.dict[categoryNumber].shopContents[i].isHided) {
          numTotal++;
          numForCategory++;
          if (this.state.dict[categoryNumber].shopContents[i].isSelected) {
            numSelected++;
            priceForCategory += this.state.dict[categoryNumber].shopContents[i].price;
          };
        }
      }
      numEachCategory.push(numForCategory);
      priceEachCategory[this.state.dict[categoryNumber].categoryName] = priceForCategory;
      priceTotal += priceForCategory;
    })
    for (var i = 0; i < this.state.dict.length; i++) {
      if (numEachCategory[i] > 0) {
        listWithCategories(
          categoryName = this.state.dict[i].categoryName,
          shopContents = this.state.dict[i].shopContents,
          toggleFunction = this.selectFromDict(i),
          deleteFunction = this.deleteFromDict(i),
          numItems = numEachCategory[i],
        );
      }
    }
    //console.log(numTotal, numSelected);
    if (numTotal > 0) {
      return (
        <React.Fragment>
          <ScrollView
            stickyHeaderIndices={headerIndices}>
            <SelectedCourses
              numTotal={numTotal}
              numSelected={numSelected}
              functionSelectAll={this.selectAll}
              functionDeselectAll={this.deSelectAll}
              functionDeleteSelected={this.alertDeletion(numSelected)}
              isSelectedAll={numTotal == numSelected} />
            {scrollItems}
            <ShopContentsCalculation
              fees={priceEachCategory}
              totalFee={priceTotal}
              discountFee={priceDiscount}
              shipingFee={priceShipping} />
          </ScrollView>
          <CheckOutButton totalFee={priceTotal + priceShipping - priceDiscount} numSelected={numSelected} />
        </React.Fragment>
      )
    }
    else {
      return (
        <React.Fragment>
          <CartIsEmpty functionRefresh={this.refreshAll} />
          <CheckOutButton />
        </React.Fragment>
      )
    }
  }
}




function CartIsEmpty({
  functionRefresh
}) {
  return (
    <View style={styles.cartIsEmpty}>
      <Ionicons name='md-cart' style={styles.cartIsEmptyIcon} />
      <Text style={styles.cartIsEmptyTitle}>Cart is Empty!</Text>
      <TouchableOpacity onPress={functionRefresh}>
        <Text style={styles.cartIsEmptyText}>
          Click
          <Text style={{ color: BuildStyle.colorGreen }}> here </Text>
          to continue searching
        </Text>
      </TouchableOpacity>
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
      <TouchableOpacity onPress={isSelectedAll ? functionDeselectAll : functionSelectAll}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CheckCircle margin={BuildStyle.baseMargin} isSelected={isSelectedAll} />
          <Text style={styles.selectedCoursesText}>{isSelectedAll ? 'Deselect' : 'Select'} All ({numSelected} / {numTotal})
            </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={functionDeleteSelected}>
        <Ionicons name='md-trash' size={30} style={{ color: (numSelected > 0) ? BuildStyle.colorGreen : BuildStyle.colorLightGray, margin: 5, marginRight: BuildStyle.baseMargin - 5 }} />
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
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

  cartIsEmpty: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BuildStyle.colorLightGray,
  },
  cartIsEmptyIcon: {
    fontSize: BuildStyle.fontLarge * 10,
    color: BuildStyle.colorGray,
  },
  cartIsEmptyTitle: {
    fontSize: BuildStyle.fontLarge * 2,
    color: BuildStyle.textColor,
    fontWeight: 'bold',
  },
  cartIsEmptyText: {
    fontSize: BuildStyle.fontNormal,
    color: BuildStyle.colorGray,
  }
})
