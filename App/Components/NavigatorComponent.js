/**
 * Created by Calvin Huang on 2/16/17.
 */

import React, { PropTypes, Component } from 'react';
import {
  TouchableOpacity,
  Navigator,
  Platform,
} from 'react-native';

import dismissKeyboard from 'dismissKeyboard';

import Icon from 'react-native-vector-icons/Ionicons';

import { NavigatorStyle } from '../Styles';

export default class NavigatorComponent extends Component {
  static propTypes = {
    navigator: PropTypes.shape().isRequired,
    route: PropTypes.shape().isRequired,
  };

  // You can override navLeftButton/navRightButton to provide
  // different nav button in various components.
  static navLeftButton(route, navigator) {
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
    }
    return null;
  }

  static navRightButton() {
    return null;
  }

  static title() {
    return null;
  }

  get currentRoute() {
    const { navigator } = this.props;
    const currentRoute = navigator.getCurrentRoutes()[navigator.getCurrentRoutes().length - 1];
    return currentRoute;
  }

  get isCurrentRoute() {
    const { route } = this.props;
    return this.currentRoute.index === route.index;
  }

  pushToNextComponent(component, data = {}, transition = Navigator.SceneConfigs.PushFromRight) {
    this.props.navigator.push({
      index: this.props.route.index + 1,
      component,
      data,
      transition,
    });
  }
}
