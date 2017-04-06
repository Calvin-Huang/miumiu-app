/**
 * Created by Calvin Huang on 2/16/17.
 */

import React, { PropTypes, Component } from 'react';
import {
  View,
  TouchableOpacity,
  Navigator,
  Platform,
} from 'react-native';

import dismissKeyboard from 'dismissKeyboard';

import Icon from 'react-native-vector-icons/Ionicons';

import { NavigatorStyle } from '../Styles';

export default class NavigatorComponent extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
  }

  // You can override navLeftButton/navRightButton to provide different nav button in various components.
  static navLeftButton(route, navigator, index, navState) {
    if (route.transition === Navigator.SceneConfigs.PushFromRight) {
      return (
        <TouchableOpacity onPress={() => { dismissKeyboard(); navigator.pop(); }}>
          <Icon
            style={NavigatorStyle.navBackButton}
            name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
            size={24}
            color="#FFFFFF"
          />
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
