import React from 'react';
import { Text } from 'react-native';
import * as BuildStyle from '../BuildStyle';

export class PriceText extends React.Component {
    render(){
        const {
            price = 1111,
            fontSize = BuildStyle.fontNormal,
            color = BuildStyle.priceColor,
        } = this.props;
        return(
          <Text style = {{fontSize: fontSize, color: color, fontWeight: 'bold'}}>
            {(price<0)?'- ':''}$ {(Math.abs(price)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text> 
        )
    }
}