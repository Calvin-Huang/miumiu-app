/**
 * Created by Calvin Huang on 2/15/17.
 */
import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import FasterSignImage from '../../assets/images/faster-sign.png';

const styles = {
  container: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
};

export default class IconFasterShipping extends Component {
  static propTypes = {
    style: PropTypes.shape(),
    tintColor: PropTypes.string,
    iconColor: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number,
  };
  static defaultProps = {
    style: null,
    tintColor: null,
    iconColor: null,
    color: null,
    size: 17,
  };

  render() {
    return (
      <View style={{ ...this.props.style, ...styles.container }}>
        <Image
          style={{ ...{ tintColor: this.props.tintColor || this.props.color }, marginRight: -1 }}
          source={FasterSignImage}
        />
        <Icon name="md-cart" size={this.props.size} color={this.props.iconColor || this.props.color || '#4A4A4A'} />
      </View>
    );
  }
}

