/**
 * Created by Calvin Huang on 3/1/17.
 */

import React from 'react';
import {
  View,
  Navigator,
} from 'react-native';

import NavigatorNavigationBar from 'NavigatorNavigationBar';

import { NavigatorComponent } from './';

NavigatorNavigationBar.defaultProps = {
  ...NavigatorNavigationBar.defaultProps,
  routeMapper: {
    LeftButton: (route, navigator, index, navState) => {
      const component = route.component.WrappedComponent || route.component;
      if (component.navLeftButton) {
        return (
          <View style={styles.navBarContentContainer}>
            {component.navLeftButton(route, navigator, index, navState)}
          </View>
        );
      } else {
        return null;
      }
    },
    RightButton: (route, navigator, index, navState) => {
      const component = route.component.WrappedComponent || route.component;
      if (component.navRightButton) {
        return (
          <View style={styles.navBarContentContainer}>
            {component.navRightButton(route, navigator, index, navState)}
          </View>
        );
      } else {
        return null;
      }
    },
    Title: (route, navigator, index, navState) => {
      const component = route.component.WrappedComponent || route.component;
      if (component.title) {
        return (
          <View style={styles.navBarContentContainer}>
            {component.title(route, navigator, index, navState)}
          </View>
        );
      } else {
        return null;
      }
    },
  }
};

Navigator.defaultProps = {
  ...Navigator.defaultProps,
  renderScene: (route, navigator) => {
    if (route.component.WrappedComponent && (route.component.WrappedComponent.prototype instanceof NavigatorComponent)
      || route.component.prototype instanceof NavigatorComponent) {
      return <route.component route={route} navigator={navigator} />;
    } else {
      throw new Error('⚠️ Component must inherited NavigatorComponent ⚠️');

      return null;
    }
  },
  configureScene: (route, routeStack) => {
    return route.transition || Navigator.SceneConfigs.PushFromRight;
  },
};

const styles = {
  navBarContentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
};

export default Navigator;
