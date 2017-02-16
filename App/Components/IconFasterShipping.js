/**
 * Created by Calvin Huang on 2/15/17.
 */
import React, { Component } from 'react';
import {
  View,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class IconFasterShipping extends Component {
  render() {
    return (
      <View style={{ ...this.props.style, ...styles.container }}>
        <Image style={{ marginRight: -1 }} source={require('../../assets/images/faster-sign.png')} />
        <Icon name="md-cart" size={17} color="#4A4A4A" />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
  }
};