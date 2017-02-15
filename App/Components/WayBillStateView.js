/**
 * Created by Calvin Huang on 2/15/17.
 */

import React, { PropTypes, Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { WayBillState } from '../Constants/states';

export default class WayBillStateView extends Component {
  render() {
    return (
      <View style={{...this.props.style, ...styles.container}}>
        <Icon name="md-time" size={24} color="#757575" />
        <Text style={styles.text}>
          貨運中
        </Text>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
  },
  text: {
    marginTop: -2,
    color: '#757575',
    fontSize: 8,
    fontWeight: 'bold',
  },
};
