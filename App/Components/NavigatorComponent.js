/**
 * Created by Calvin Huang on 2/16/17.
 */

import React, { PropTypes, Component } from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class NavigatorComponent extends Component {
  static propTypes = {
    rootComponent: PropTypes.object.isRequired,
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  }

  // You can override navLeftButton/navRightButton to provide different nav button in various components.
  static navLeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity onPress={() => { navigator.pop(); }}>
        <Icon style={styles.navBackButton} name="ios-arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    );
  }

  static navRightButton(route, navigator, index, navState) {
    return null;
  }

  static title(route, navigator, index, navState) {
    return null;
  }
}

const styles = {
  navBackButton: {
    marginTop: 10,
    marginRight: 80,
    marginLeft: 9,
    marginBottom: 8,
  }
};
