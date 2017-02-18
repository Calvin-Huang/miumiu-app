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
} from 'react-native';

import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/Ionicons';

import { NavigatorComponent } from './App/Components';

import WayBills from './App/Views/WayBills';
import Menu from './App/Components/Menu';

export default class miumiu extends Component {
  constructor() {
    super();

    this.state = {
      menuIcon: null,
      addIcon: null,
      hideNavigator: false,
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

  render() {
    const routes = [
      { index: 0, component: WayBills },
    ]

    return (
      <Drawer
        ref="sideDrawer"
        type="overlay"
        content={<Menu />}
        tapToClose={true}
        openDrawerOffset={304}
      >
        <StatusBar barStyle='light-content' />
        <Navigator
          style={styles.container}
          initialRoute={routes[0]}
          initialRouteStack={routes}
          renderScene={(route, navigator) => {
            if (route.component.prototype instanceof NavigatorComponent) {
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
            (!this.state.hideNavigator &&
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
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBarContentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

AppRegistry.registerComponent('miumiu', () => miumiu);
