import React from 'react';
import { ScrollView, StyleSheet, View,  Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as BuildStyle from '../BuildStyle';

import { CheckCircle } from './CheckCircle';
import { PriceText } from './PriceText';
import { ShopContent } from './ShopContent';

export class ShopContentsScroll extends React.Component {
    render(){
        var headerIndices =[]
        for(var i = 0; i < 3; i++){
          headerIndices.push(2*i+1);
        }
        var scrollItems = [];
        var keyCounter = 0;
        function listWithCategories(
          categoryName = 'Courses',
          shopContents = [{
            name: 'Name of Content',
            star: 3,
            review: 132,
            price: 1111,
            date: 'DD-MM-YYYY',
            checked: false,
          },{
            name: 'Name of Content',
            star: 3,
            review: 132,
            price: 1111,
            date: 'DD-MM-YYYY',
            checked: false,
          },{
            name: 'Name of Content',
            star: 3,
            review: 132,
            price: 1111,
            date: 'DD-MM-YYYY',
            checked: false,
          },
          ]
        ){
          scrollItems.push(<ShopContentsCategory categoryName = {categoryName} key = {keyCounter++} />);
          scrollItems.push(<ShopContentsUnderCategory data = {shopContents} key = {keyCounter++} />);
        }
        for(var i = 0; i < 3; i++){
          listWithCategories();
        }
        return(
          <ScrollView 
            stickyHeaderIndices = {headerIndices}>
            <SelectedCourses />
            {scrollItems}
            <ShopContentsCalculation />
          </ScrollView>
        )
    }
}

function ShopContentsCategory({
  categoryName = 'Courses',
  numItems = 3,
}){
  return(
    <View style = {styles.totalCourses}>
      {/*<View style = {{height:20, width:20, backgroundColor:'white', marginLeft: 15, marginRight:10}} />*/}
      <Ionicons name = "md-cart" size = {30} style = {{color: BuildStyle.colorLightGreen, marginLeft: BuildStyle.baseMargin - 2, marginRight: BuildStyle.baseMargin - 3}} />
      <Text style = {styles.totalCoursesText}>{categoryName}: </Text>
      <Text style = {[styles.totalCoursesText, {fontWeight:'bold', color:BuildStyle.textColor}]}>{numItems}</Text>
    </View>
  )
}

function ShopContentsCalculation({
  fees={
    "Course" : 2222,
    "Textbook" : 1111,
    "Shipping" : 560,
  },
  discountFee = -200,
  totalFee = 3593,
}){
  return(
    <View style = {styles.shopContentsCalculation} >
      <ShopContentsCalculationCategory categoryName = 'Course' categoryFee = {2222} />
      <ShopContentsCalculationCategory categoryName = 'Textbook' categoryFee = {1111} />
      <ShopContentsCalculationCategory categoryName = 'Shipping' categoryFee = {560} />
      <View style = {{height:1, backgroundColor: BuildStyle.colorLightGray, flex: 1}} />
      <ShopContentsCalculationCategory categoryName = 'Discount' categoryFee = {-200} />
      <View style = {{height:1, backgroundColor: BuildStyle.colorLightGray, flex: 1}} />
      <ShopContentsCalculationCategory categoryName = 'Total' categoryFee = {3593} />
    </View>
  )
}

function ShopContentsCalculationCategory({
  categoryName = 'Course',
  categoryFee = 1111,
}){
  return(
    <View style = {styles.shopContentsCulationCategory}>
      <Text style = {styles.shopContentsCalculationCategoryText}>{categoryName}</Text>
      <PriceText price = {categoryFee} fontSize = {BuildStyle.fontLarge} />
    </View>
  )
}

function ShopContentsUnderCategory({
  data
}){
  return(
    <View>
      {
        Object.keys(data).map((contentKey, keyCounter) => {
          var content = data[contentKey];
          return(
            /*
            <ShopContent
              cName = {content[name]}
              cPrice = {content[price]}
              cDate = {content[date]}
              isSelected = {content[checked]}
              star = {content[star]}
              review = {content[review]} 
              key = {keyCounter++} />
              */
            <ShopContent key = {keyCounter}/>
          )
        })
      }
      <View style = {styles.division} />
    </View>
  )
}


function SelectedCourses({
    numTotal = 10,
    numSelected = 3,
  }){
    return(
      <View style = {styles.selectedCourses}>
        <View style = {{flexDirection:'row', alignItems:'center'}}>
          <CheckCircle margin = {BuildStyle.baseMargin}/>
          <Text style = {styles.selectedCoursesText}>Select All ({numSelected} / {numTotal})
          </Text>
        </View>
        {/*
        <CenterizedText
          height = {30}
          width = {60}
          text = 'Delete'
          fontColor = 'white'
          backgroundColor = {BuildStyle.colorLightGray}
        />
        */}
           <Ionicons name = 'md-trash' size = {30} style = {{color: BuildStyle.colorLightGray, margin:5, marginRight:BuildStyle.baseMargin-5}} />
      </View>
    )
  }


const styles = StyleSheet.create({

    totalCourses:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'flex-start',
      backgroundColor: 'white',
      borderBottomColor: BuildStyle.colorLightGray,
      borderBottomWidth: 1,
      height:40,
    },
    totalCoursesText:{
      fontSize: BuildStyle.fontNormal,
      color: BuildStyle.textColor,
    },
  
    selectedCourses:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'white',
      //paddingRight: BuildStyle.baseMargin,
      marginBottom: 1,
      height: 40,
    },
    selectedCoursesText:{
      fontSize: BuildStyle.fontNormal,
      color:'gray',
    },
  
  
  
    division:{
      height: 10,
      borderTopWidth:5,
      borderTopColor: 'white',
    },
  
    shopContentsCalculation:{
      backgroundColor: 'white',
      paddingTop: 10,
      paddingBottom: 10,
      paddingHorizontal: BuildStyle.baseMargin,
  
    },
    shopContentsCulationCategory:{
      //paddingHorizontal: BuildStyle.baseMargin,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical:5,
    },
    shopContentsCalculationCategoryText:{
      fontSize: BuildStyle.fontNormal,
      color: BuildStyle.textColor,
    },

})
