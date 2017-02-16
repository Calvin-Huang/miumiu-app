/**
 * Created by Calvin Huang on 2/15/17.
 */

import React, { PropTypes, Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { WayBillState, stateInfoMapping } from '../Constants/states';

export default class WayBillStateView extends Component {
  static propTypes = {
    state: PropTypes.number.isRequired,
  }

  static defaultProps = {
    state: WayBillState.CONFIRMING,
  }

  render() {
    const { icon, title, iconColor } = stateInfoMapping[this.props.state] || {};

    return (
      <View style={{...this.props.style, ...styles.container}}>
        <Icon name={icon} size={24} color={iconColor} />
        <Text style={styles.text}>
          {title}
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
