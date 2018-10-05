import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { WebBrowser } from 'expo';
import { FontAwesome } from '@expo/vector-icons';

let priceColor = 'mediumseagreen';
let buttonColor = 'lightgreen';
//let textColor = '#444444';
let textColor = 'black';
let notiColor = 'red';
let colorGray = 'gray';
let colorLightGray = 'lightgray';
let colorGreen = 'mediumseagreen';
let colorLightGreen = 'mediumseagreen';
let colorLightLightGreen = '#eefcee';
let colorRed = 'lightcoral';

let fontTitle = 20;
let fontNormal = 14;
let fontLarge = 16;
let fontSmall = 10;
let fontSmaller = 8;

let borderWidth = 2;

let dummy = 0;

export default class App extends React.Component {
  render() {
    return (
      <View style = {{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: colorLightGray,
      }}>
        <Title title = 'My Courses'></Title>
        <View style = {{
          flexDirection: 'row',
          //marginLeft:1,
        }}>
        <TapButton 
          notiNumber = {10}
          isSelected = {true} />
        <TapButton 
          title = 'Purchased' />
        </View>
        <View style = {{backgroundColor: 'white', marginBottom: 1}}>
        {/* ///////////////////////////////////////////////////////////////필요한가?
          <Text style = {styles.recentUpdate}>
            Recent Update: HH:mm DD.MM.YYYY
          </Text>
          */}
          <TotalCourses></TotalCourses>
          <SelectedCourses></SelectedCourses>
        </View>
        <ScrollView>
          <View style = {{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginTop: 1+dummy,
            marginBottom: dummy,
          }}>
          
            <ShopContent 
              cName = 'Text Trunscate' 
              cPrice = '2,530' 
              cSummary = 'sleepy'
              cDate = '10-05-2018'
              />
            <ShopContent 
              cName = 'Long Text Test Long Text Test Long Text Test'
              cSummary = 'long summary test long summary test hyle hidra'
              isSelected = {true} />
            <ShopContent />
            <ShopContent isSelected = {true}/>
            <ShopContent isSelected = {true}/>
            <ShopContent />
            <ShopContent />
            <ShopContent />
          </View>
        </ScrollView>
        
        <CheckOutButton totalFee = '3,333' originFee = '0' disountFee = '0' /> 
      </View>
    );
  }
}

function ShopContent({
  cName = 'Name of Content',
  cSummary = 'summary of content',
  cDate = 'DD-MM-YYYY',
  cPrice = '1,111',
  isSelected = false,
}){
  return(
    <View style = {[styles.shopContent, isSelected ? styles.shopContentSelected : styles.shopContentSelectedNot]}>
      {/*
      <View style = {[styles.shopPriceCircle, {margin:10}]}>
      </View>
      */}
      <CheckCircle margin = {10} isSelected = {isSelected}/>
      <CenterizedText 
        text = 'image'
        fontColor = 'white'
        backgroundColor = 'gray'
        width= {60}
        height = {60}
      />
      <View style = {styles.shopSummary}>
        <View style = {styles.shopText}>
            <Text
            numberOfLines = {1} 
            style = {styles.shopTextTitle}>
              {cName}
            </Text>
            {/*
            <Text 
            numberOfLines = {1}
            style = {styles.shopTextSummary}>    
              {cSummary}
            </Text>
            <View style = {{flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
            </View>
            */}
            <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
            <PriceText price = {cPrice}></PriceText>
              <Text
              numberOfLines = {1}
              style = {[{textAlign:'right'},styles.shopTextSummary]}>
                {cDate}
              </Text>
            </View>
        </View>
      </View>
      
    </View>
  )
}

function Title({
  title = 'Title of Page'
}){
  return(
    <View style = {styles.title}>
      <Text style = {styles.titleText}>
        {title}
      </Text>
    </View>
  )
}

function TapButton({
  title = 'Cart',
  notiNumber = 0,
  isSelected = false,
}){
  return(
    <View style = {[
      isSelected ? styles.tapSelected : styles.tapSelectedNot, 
      styles.tap
    ]}>
      <Text style = {[
        isSelected ? styles.tapTextSeltected : styles.tapTextSeltectedNot,
        styles.tapText
      ]}>
        {title}
      </Text>
      {(function(){
        if(notiNumber ==0){
          return null
        }
        else{
          return <View style = {{margin: 5}} ><Badge number= {notiNumber} /></View>
        }
      })()}

    </View>

  )
}

function Badge({
  number = 10,
  size = fontNormal,
}){
  return(
    <View style = {[styles.badgeCircle, {height: size, borderRadius: size/2, width:(number.toString().length * size)}]}>
      <Text style = {[styles.badgeCount, {fontSize: size-2}]}>
        {number}
      </Text>
    </View>

  )
}
function CheckCircle({
  isSelected = false,
  margin = 0,
  size = 20,
}){
  return(
    <View style = {[
      isSelected ? {backgroundColor: colorLightGreen} : {backgroundColor: colorLightGray},
      {width: size, 
        height: size, 
        borderRadius: size/2, 
        margin: margin,
        justifyContent: 'center',
        alignItems: 'center',
      }
      ]}>
      {(function(){
        if(isSelected){
          return (
            <Text style = {[styles.checkCircleText, {fontSize : size * 0.6}]}>√</Text>
          )
        }
      })()}
    </View>
  )
}

function CenterizedText({
  height = 50,
  width = 50,
  text = 'text',
  fontWeight = 'normal',
  backgroundColor = 'lightgray',
  fontColor = 'black',
  fontSize = fontNormal,
  margin = 0,
  verticalAlign = 'center',
  horizontalAlign = 'center',
}){
  return(
    <View style = {{
      width: width, 
      height: height, 
      backgroundColor: backgroundColor,
      margin: margin,
      flexDirection: 'column',
      justifyContent: verticalAlign,
      alignItems: horizontalAlign, }}>
      <Text style = {{color:fontColor, fontSize: fontSize, fontWeight: fontWeight}}>{text}</Text>
    </View>
  )
}

function PriceText({
  price = '1,111',
  fontSize = fontNormal,
}){
  return(
    <Text style = {{fontSize: fontSize, color: priceColor, fontWeight: 'bold'}}>${price}</Text> 
  )
}

function TotalCourses({
  numCourses = 6,
  numTextbooks = 4,
}){
  return(
    <View style = {styles.totalCourses}>
      {/*<View style = {{height:20, width:20, backgroundColor:'white', marginLeft: 15, marginRight:10}} />*/}
      <FontAwesome name = 'shopping-cart' size = {24} style = {{color: colorLightGreen, marginLeft: 13, marginRight: 8}} />
      <Text style = {[styles.totalCoursesText, {fontWeight:'bold', color:textColor}]}>{numCourses}</Text>
      <Text style = {styles.totalCoursesText}> Courses </Text>
      <View style = {{height:20, width:2, backgroundColor: 'lightgray' }} />
      <Text style = {[styles.totalCoursesText, {fontWeight:'bold', color:textColor}]}> {numTextbooks}</Text>
      <Text style = {styles.totalCoursesText}> Textbooks</Text>
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
        {/*<View style = {[styles.shopPriceCircle, {marginLeft: 15, marginRight: 10}]} />*/}
        <CheckCircle margin = {10}/>
        <Text style = {styles.selectedCoursesText}>Select All ({numSelected} / {numTotal})
        </Text>
      </View>
      {/*
      <CenterizedText 
        //text = '凶' 
        text = 'Delete'
        fontColor = 'white'
        fontWeight = 'bold'
        width = {80} 
        height = {30} 
        //margin= {5}
        backgroundColor = 'lightpink' />
        */}
        <FontAwesome name = 'trash-o' size = {30} style = {{color: colorRed, margin:5}} />
    </View>
  )
}

function CheckOutButton({
  totalFee = '3,333',
  originFee = '0',
  discountFee = '0',
}){
  return(
    <View style = {styles.checkOutButton}>
      <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 10, marginLeft: 5}}>
        <View style = {{flexDirection: 'row', alignItems: 'center'}}>
          <CheckCircle
            margin = {10}
            isSelected = {true}
            />
          <Text style = {styles.checkOutButtonTextLarge}>3 Items,</Text>
        </View>
        <View style = {{flexDirection: 'row', alignItems: 'center'}}>
          <Text style = {styles.checkOutButtonTextLarge}>Total </Text>
          <PriceText prince = {'$' + toString(totalFee)} fontSize = {fontLarge} />
        </View>
        {/*}
        <View style = {{flexDirection: 'row'}}>
          <Text style = {styles.checkOutButtonTextSmall}>Original Fee: ${originFee}</Text>
          <Text style = {styles.checkOutButtonTextSmall}> | Discount Fee: ${discountFee}</Text>
        </View>
        {*/}
      </View>
      <CenterizedText
        height = {40}
        width = {120}
        backgroundColor = {colorLightGreen}
        text = 'Check Out'
        fontColor = 'white'
        fontWeight = 'bold'
      />
      
    </View>
  )
}
const styles = StyleSheet.create({
  title:{
    height:45,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    alignItems:'center',
    justifyContent: 'center',
    marginBottom: 1,
  },
  titleText:{
    //fontWeight: 'bold',
    fontSize: fontTitle,
    color: textColor,
    //color:'#1f1f1f',
  },

  badgeCount:{
    color:'white',
  },
  badgeCircle:{
    backgroundColor: colorRed,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkCircleText:{
    color: 'white',
    fontWeight: 'bold',
  },


  tap:{
    paddingHorizontal : 10,
    height:40,
    //marginRight:1,
    borderColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    flexDirection: 'row',
  },
  tapSelected:{
    backgroundColor: 'white',
    borderBottomColor: colorGreen,
    borderBottomWidth: 3,
  },
  tapSelectedNot:{
    backgroundColor: 'white',
    borderBottomColor: colorLightGray,
    borderBottomWidth: 1,
  },
  tapText:{
    //fontWeight: 'bold',
    fontSize: fontNormal,
  },
  tapTextSeltected:{
    color: colorGreen,
  },
  tapTextSeltectedNot:{
    color: textColor,
  },


  totalCourses:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
    marginTop: 10,
  },
  totalCoursesText:{
    fontSize: fontNormal,
    color: textColor,
  },

  recentUpdate:{
    fontSize: fontNormal,
    color: 'gray',
    marginHorizontal:15,
  },

  selectedCourses:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //marginRight: 5,
    //marginBottom: 0,
    marginVertical: 0,
    marginHorizontal: 5,
  },
  selectedCoursesText:{
    fontSize: fontNormal,
    color:'gray',
  },


  shopContent:{
    margin:5,
    marginTop:0,
    marginBottom:1,
    height: 70,
    //backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  shopContentSelected:{
    backgroundColor: 'white',
  },
  shopContentSelectedNot:{
    backgroundColor: 'white',
  },
  shopSummary:{
    flex:1,
  },
  shopText:{
    padding: 10,
    paddingTop: 5,
    //paddingHorizontal: 10,
    flex:1,
    height:80,
    justifyContent: 'center',
    //alignItems: 'stretch',
    //color: textColor,
  },
  shopTextSummary:{
    color: 'gray',
  },
  shopTextTitle:{
    color: textColor,
    fontSize: fontLarge,
  },

  checkOutButton:{
    flexDirection: 'row',
    marginTop:1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  checkOutButtonTextLarge:{
    fontSize: fontLarge,
    //fontWeight: 'bold',
    color: textColor,
  },
  checkOutButtonTextSmall:{
    fontSize: fontSmaller,
    color: 'gray',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
