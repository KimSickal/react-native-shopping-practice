import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ShopContent } from './ShopContent';

export class ShopContentsUnderCategory extends React.Component {
  render() {
    const {
      data,
      toggleFunction,
      deleteFunction,
      checkable = true,
    } = this.props
    return (
      <View>
        {
          Object.keys(data).map((contentKey, keyCounter) => {
            var content = data[contentKey];
            if (!content.isHided)
              if (checkable) {
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
                    onPressCheck={toggleFunction(contentKey)}
                    onPressDelete={deleteFunction(contentKey)} />
                )
              }
              else {
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
                    checkable={false} />
                )
              }
          })
        }
        <View style={styles.division} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  division: {
    height: 10,
    borderTopWidth: 5,
    borderTopColor: 'white',
  },
})
