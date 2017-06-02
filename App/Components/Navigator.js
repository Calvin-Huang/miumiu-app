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

const styles = {
  navBarContentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
};

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
      }
      return null;
    },
    RightButton: (route, navigator, index, navState) => {
      const component = route.component.WrappedComponent || route.component;
      if (component.navRightButton) {
        return (
          <View style={styles.navBarContentContainer}>
            {component.navRightButton(route, navigator, index, navState)}
          </View>
        );
      }
      return null;
    },
    Title: (route, navigator, index, navState) => {
      const component = route.component.WrappedComponent || route.component;
      if (component.title) {
        return (
          <View style={styles.navBarContentContainer}>
            {component.title(route, navigator, index, navState)}
          </View>
        );
      }
      return null;
    },
  },
};

Navigator.defaultProps = {
  ...Navigator.defaultProps,
  renderScene: (route, navigator) => {
    let prototype = route.component.prototype;
    if (route.component.WrappedComponent) {
      prototype = route.component.WrappedComponent.prototype;
    }

    if (prototype instanceof NavigatorComponent) {
      return <route.component route={route} navigator={navigator} />;
    }

    throw new Error('⚠️ Component must inherited NavigatorComponent ⚠️');
  },
  configureScene: route => route.transition || Navigator.SceneConfigs.PushFromRight,
};

export default Navigator;
