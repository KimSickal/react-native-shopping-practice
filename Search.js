import React from 'react';
import { StyleSheet, StatusBar, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { WebBrowser } from 'expo';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

let buttonColor = 'lightgreen';
let textColor = '#444444';
//let textColor = 'black';
let notiColor = 'red';
let colorGray = 'gray';
let colorLightGray = 'lightgray';
//let colorGreen = 'mediumseagreen';
let colorGreen = 'tomato';
let priceColor = colorGray;
let colorLightGreen = colorGreen;
let colorLightLightGreen = '#eefcee';
let colorRed = 'tomato';

let fontTitle = 20;
let fontNormal = 14;
let fontLarge = 16;
let fontSmall = 10;
let fontSmaller = 8;

let borderWidth = 2;

let baseMargin = 20;
let horizontalMargin = 2*baseMargin + 20;

export default class App extends React.Component {
  
  render() {
    return (
      <SafeAreaView style = {[
        styles.container, {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: colorLightGray,
      }]}>
        <StatusBar
          backgroundColor = 'white' />
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
        {/*
        <View style = {{backgroundColor: 'white', marginBottom: 1}}>
        ///////////////////////////////////////////////////////////////필요한가?
          <Text style = {styles.recentUpdate}>
            Recent Update: HH:mm DD.MM.YYYY
          </Text>
          <TotalCourses></TotalCourses>
          <SelectedCourses></SelectedCourses>
        </View>
        */}
        <ShopContentDummy />
      </SafeAreaView>
    );
  }
}

function ShopContent({
  data = null, 
  cName = 'Name of Content',
  cSummary = 'summary of content',
  cDate = 'DD-MM-YYYY',
  cPrice = 1111,
  isSelected = false,
}){
  if(!(data == null)){
    cName = data[0];
    cSummary = data[1];
    cDate = data[2];
    cPrice = data[3];
    isSelected = data[4];
  }
  return(
    <View style = {[styles.shopContent, isSelected ? styles.shopContentSelected : styles.shopContentSelectedNot]}>
      {/*
      <View style = {[styles.shopPriceCircle, {margin:10}]}>
      </View>
      */}
      <CheckCircle margin = {baseMargin} isSelected = {isSelected}/>
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
        <Ionicons name = 'md-close' size = {20} style = {{color:colorLightGray, marginHorizontal: baseMargin}} />
      
      
    </View>
  )
}

function ShopContentsScroll({
  categories = {
    'courses': [
      'dummy1',
      'dummy2',
    ],
    'texbooks': [
      'dummy1',
      'dummy2',
    ]
  }
}){
  var scrollLength = 0;
  var headerIndex = [];
  var data = [1, 2, 3, 4];
  /*
  for(var key in categories){
    headerIndex.push(scrollLength);
    scrollLength += (categories[key].length + 1);
    data.push[{name: 'header'}];
    for(var keykey in categories[key]){
      data.push[{name: 'content'}];
    }
  }
  */

  renderItem = ({ item }) => {
    return(
      <ShopContent />
    )
  }
  return(
    <ScrollView 
      stickyHeaderIndices = {this.headerIndex}>
    </ScrollView>
  )
}

function ShopContentDummy(){
  return(
    <ScrollView
      stickyHeaderIndices = {[]}>
        <ShopContent 
          cName = 'Text Trunscate' 
          cPrice = {2530} 
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
    </ScrollView>
  )
}



function Title({
  title = 'Title of Page'
}){
  return(
    <View style = {styles.title}>
      <Ionicons name = "md-arrow-back" style = {styles.titleIcons}/>
      <Text style = {styles.titleText}>
        {title}
      </Text>
      <Ionicons name = "md-menu" style = {styles.titleIcons}/>
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
        marginHorizontal: margin,
        justifyContent: 'center',
        alignItems: 'center',
      }
      ]}>
      {(function(){
        if(isSelected){
          return (
            //<Text style = {[styles.checkCircleText, {fontSize : size * 0.6}]}>√</Text>
            <FontAwesome name = "check" style ={[styles.checkCircleText, {fontSize : size * 0.6}]}></FontAwesome>
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
  price = 1111,
  fontSize = fontNormal,
  color = priceColor,
}){
  return(
    <Text style = {{fontSize: fontSize, color: color, fontWeight: 'bold'}}>
      {(price<0)?'- ':''}$ {(Math.abs(price)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text> 
  )
}


const styles = StyleSheet.create({
  title:{
    height:45,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  titleText:{
    //fontWeight: 'bold',
    fontSize: fontTitle,
    color: textColor,
    //color:'#1f1f1f',
  },
  titleIcons:{
    fontSize: fontTitle * 1.2,
    color: textColor,
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

  shopContent:{
    //margin:contentDummyMargin,
    marginTop:0,
    marginBottom:0,
    height: 65,
    paddingTop: 5,
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
    paddingRight: 0,
    paddingTop: 5,
    //paddingHorizontal: 10,
    flex:1,
    height:80,
    justifyContent: 'center',
    //marginRight: horizontalMargin,
    //alignItems: 'stretch',
    //color: textColor,
  },
  shopTextSummary:{
    color: 'gray',
  },
  shopTextTitle:{
    color: textColor,
    fontSize: fontLarge,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: StatusBar.currentHeight,
  },
});
