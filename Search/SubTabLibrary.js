import React from 'react';
import { StyleSheet, } from 'react-native';
import DropdownMenu from 'react-native-dropdown-menu';

import * as BuildStyle from '../BuildStyle';

export class SubTabLibrary extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      data = [
        ['1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade', '6th Grade',],
        ['English', 'Science', 'Mathematics',],
        ['Sort by Date'],
      ],
      handler,
    } = this.props;
    return (
      <DropdownMenu
        style={{ flex: 1 }}
        bgColor='white'
        tintColor={BuildStyle.textColor}
        activityTintColor={BuildStyle.colorGreen}
        handler={handler}
        data={data}
      />
    )
  }
}
const styles = StyleSheet.create({
})
