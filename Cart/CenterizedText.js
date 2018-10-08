import React from 'react';
import { View, Text } from 'react-native';
import * as BuildStyle from '../BuildStyle';

export class CenterizedText extends React.Component {
    render(){
        const {
            height = 50,
            width = 50,
            text = 'text',
            fontWeight = 'normal',
            backgroundColor = 'lightgray',
            fontColor = 'black',
            fontSize = BuildStyle.fontNormal,
            margin = 0,
            verticalAlign = 'center',
            horizontalAlign = 'center',
        } = this.props;
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
}