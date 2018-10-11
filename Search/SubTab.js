import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import * as BuildStyle from '../BuildStyle';

let categoryMargin = 20;

export class SubTab extends React.Component {
  constructor(props) {
    super(props);
    this.expand = this.expand.bind(this);
    this.contract = this.contract.bind(this);
  }
  componentWillMount() {
    this.setState({ expanded: false, expandedCategory: 0 });
  }
  expand(i) {
    return () => { this.setState({ expanded: true, expandedCategory: i }) };
  }
  contract() {
    this.setState({ expanded: false });
  }
  /*
  changeAndContract(handler){
    return () => { this.setState({ expanded: false }); handler()}
  }
  */
  render() {
    const {
      categoryData,
      selectedIndices,
      handler,
    } = this.props;
    let expanded = this.state.expanded;
    let expandedCategory = this.state.expandedCategory;
    return (
      <View>
        <View style={styles.subTab}>
          {
            Object.keys(categoryData).map((categoryKey, i) => {
              let flag = (categoryKey == expandedCategory) && expanded
              return (
                <Tab
                  text={categoryData[categoryKey][selectedIndices[categoryKey]]}
                  isSelected={flag}
                  isLastTab={categoryKey == categoryData.length - 1}
                  onPress={flag ? this.contract : this.expand(categoryKey)}
                  key={i}
                />
              )
            })
          }
        </View>
        {expanded ?
          <ExpandedList
            texts={categoryData[expandedCategory]}
            selectedIndex={selectedIndices[expandedCategory]}
            onPress={handler(expandedCategory)}
            contract={this.contract} />
          : null}
      </View>
    )
  }
}

function Tab({
  text = 'Astronomy',
  isSelected = false,
  isLastTab = false,
  onPress,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.tab,
        isLastTab ? null : styles.tabDevider
      ]}>
      <Text style={isSelected ? styles.tabTextSelected : styles.tabText}>
        {text}{' '}
      </Text>
      <Ionicons
        name={isSelected ? 'md-arrow-dropup' : 'md-arrow-dropdown'}
        style={isSelected ? styles.tabTextSelected : styles.tabText} />
    </TouchableOpacity>
  )
}

function ExpandedList({
  texts = [],
  selectedIndex = 0,
  onPress,
  contract = (() => { }),
}) {
  return (
    <View style={styles.expandedList}>
      {Object.keys(texts).map((index, i) => {
        return (
          <TouchableOpacity onPress={() => { onPress(index)(); contract() }} key={i}>
            {index == selectedIndex ?
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.expandedListTextSelected} >{texts[index]}</Text>
                <Ionicons name='md-checkmark' style={styles.expandedListTextSelected} />
              </View> :
              <Text style={styles.expandedListText}>{texts[index]}</Text>
            }
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  subTab: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: BuildStyle.colorLightGray,
  },
  tab: {
    flex: 1,
    height: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabDevider: {
    borderRightWidth: 1,
    borderRightColor: BuildStyle.colorLightGray,
  },
  tabText: {
    fontSize: BuildStyle.fontNormal,
    color: BuildStyle.colorGray,
  },
  tabTextSelected: {
    fontSize: BuildStyle.fontNormal,
    color: BuildStyle.colorGreen,
  },
  expandedList: {
    backgroundColor: 'white',
    paddingBottom: categoryMargin,
    marginBottom: 5,
  },
  expandedListText: {
    fontSize: BuildStyle.fontNormal,
    color: BuildStyle.textColor,
    marginTop: categoryMargin,
    marginLeft: BuildStyle.baseMargin + 5,
    marginRight: BuildStyle.baseMargin,
  },
  expandedListTextSelected: {
    fontSize: BuildStyle.fontNormal,
    color: BuildStyle.colorGreen,
    marginTop: categoryMargin,
    marginLeft: BuildStyle.baseMargin + 5,
    marginRight: BuildStyle.baseMargin,
  },
})
