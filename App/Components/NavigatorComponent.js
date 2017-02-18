/**
 * Created by Calvin Huang on 2/16/17.
 */

import React, { PropTypes, Component } from 'react';
import {
  View,
  TouchableOpacity,
  Navigator,
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
    if (route.transition === Navigator.SceneConfigs.PushFromRight) {
      return (
        <TouchableOpacity onPress={() => { navigator.pop(); }}>
          <Icon style={styles.navBackButton} name="ios-arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }

  static navRightButton(route, navigator, index, navState) {
    return null;
  }

  static title(route, navigator, index, navState) {
    return null;
  }

  pushToNextComponent(component, data = {}, transition = Navigator.SceneConfigs.PushFromRight) {
    this.props.navigator.push({
      index: this.props.route.index + 1,
      component: component,
      data: data,
      transition: transition,
    });
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
