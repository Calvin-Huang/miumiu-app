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
            return <route.component rootComponent={this} index={route.index} navigator={navigator} />;
          }}
          navigationBar={
            (!this.state.hideNavigator &&
              <Navigator.NavigationBar
                style={{ flex: 1 }}
                routeMapper={{
                  LeftButton: (route, navigator, index, nextState) => {
                    if (route.component.navLeftButton) {
                      return (
                        <View style={styles.navBarContentContainer}>
                          {route.component.navLeftButton(index, nextState)}
                        </View>
                      );
                    }

                    return (
                      <View style={styles.navBarContentContainer}>
                        <TouchableOpacity onPress={() => { navigator.pop(); }}>
                          <Icon style={styles.navBackButton} name="ios-arrow-back" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                      </View>
                    );
                  },
                  RightButton: (route, navigator, index, nextState) => {
                    if (route.component.navRightButton) {
                      return (
                        <View style={styles.navBarContentContainer}>
                          {route.component.navRightButton(index, nextState)}
                        </View>
                      );
                    }
                  },
                  Title: (route, navigator, index, nextState) => {
                    if (route.component.title) {
                      return (
                        <View style={styles.navBarContentContainer}>
                          {route.component.title(index, nextState)}
                        </View>
                      );
                    }

                    return false;
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
  navBackButton: {
    marginTop: 9,
    marginRight: 80,
    marginLeft: 9,
    marginBottom: 9,
  }
});

AppRegistry.registerComponent('miumiu', () => miumiu);
