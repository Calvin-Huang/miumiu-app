/**
 * Created by Calvin Huang on 2/24/17.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  Navigator,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';

import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/Ionicons';

import { NavigatorComponent } from '../Components';

import WayBills from './WayBills';
import Menu from '../Components/Menu';

import { closeSideDrawer } from '../Actions/sideDrawerActions';

class Main extends Component {
  constructor() {
    super();

    this.state = {
      menuIcon: null,
      addIcon: null,
      overlayOpacityValue: new Animated.Value(0),
    };
  }

  async componentWillMount() {
    const menuIcon = await Icon.getImageSource('menu', 24, 'white');
    const addIcon = await Icon.getImageSource('add', 24, 'white');

    this.setState({
      menuIcon: menuIcon,
      addIcon: addIcon,
    });
  }

  fadeInOutOverlay() {
    const nextOpacityValue = -(this.state.overlayOpacityValue._value - 1);

    Animated.timing(
      this.state.overlayOpacityValue,
      {
        toValue: nextOpacityValue,
        duration: 250,
        easing: Easing.linear
      }
    ).start();
  }

  render() {
    const routes = [
      { index: 0, component: WayBills },
    ]

    return (
      <Drawer
        open={this.props.sideDrawerOpened}
        ref="sideDrawer"
        type="overlay"
        content={<Menu />}
        tapToClose={true}
        openDrawerOffset={56}
        onClose={() => { this.props.closeSideDrawer(); }}
        onOpenStart={this.fadeInOutOverlay.bind(this)}
        onCloseStart={this.fadeInOutOverlay.bind(this)}
      >
        <StatusBar barStyle='light-content' />
        <Navigator
          style={styles.container}
          initialRoute={routes[0]}
          initialRouteStack={routes}
          renderScene={(route, navigator) => {
            if (route.component.WrappedComponent && (route.component.WrappedComponent.prototype instanceof NavigatorComponent)
                || route.component.prototype instanceof NavigatorComponent) {
              return <route.component rootComponent={this} route={route} navigator={navigator} />;
            } else {
              throw new Error('⚠️ Component must inherited NavigatorComponent ⚠️');

              return null;
            }
          }}
          configureScene={(route, routeStack) => {
            return route.transition;
          }}
          navigationBar={
            (this.props.showNavigator &&
              <Navigator.NavigationBar
                style={{ flex: 1 }}
                routeMapper={{
                  LeftButton: (route, navigator, index, navState) => {
                    if (route.component.navLeftButton) {
                      return (
                        <View style={styles.navBarContentContainer}>
                          {route.component.navLeftButton(route, navigator, index, navState)}
                        </View>
                      );
                    } else {
                      return null;
                    }
                  },
                  RightButton: (route, navigator, index, navState) => {
                    if (route.component.navRightButton) {
                      return (
                        <View style={styles.navBarContentContainer}>
                          {route.component.navRightButton(route, navigator, index, navState)}
                        </View>
                      );
                    } else {
                      return null;
                    }
                  },
                  Title: (route, navigator, index, navState) => {
                    if (route.component.title) {
                      return (
                        <View style={styles.navBarContentContainer}>
                          {route.component.title(route, navigator, index, navState)}
                        </View>
                      );
                    } else {
                      return null;
                    }
                  },
                }}
              />
            )
          }
        />
        { this.props.sideDrawerOpened &&
          <Animated.View style={{ ...styles.overlay, opacity: this.state.overlayOpacityValue }} />
        }
      </Drawer>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  navBarContentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
};

export default connect(
  (state, ownProps) => {
    return {
      ...ownProps,
      showNavigator: state.navigationBar.isShown,
      sideDrawerOpened: state.sideDrawer.isOpened,
    };
  },
  { closeSideDrawer }
)(Main);
