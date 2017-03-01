/**
 * Created by Calvin Huang on 2/24/17.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
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

import { NavigatorComponent, IconFasterShipping } from '../Components';

import WayBills from './WayBills';
import UrgentProcessing from './UrgentProcessing';
import Calculator from './Calculator';
import { Menu, Navigator } from '../Components';

import { openSideDrawer, closeSideDrawer } from '../Actions/sideDrawerActions';

class Main extends Component {
  constructor() {
    super();

    this.state = {
      menuIcon: null,
      addIcon: null,
      overlayOpacityValue: new Animated.Value(0),
      navigationItems: [
        {
          icon: {
            name: 'md-list-box',
          },
          name: '貨單管理',
          component: WayBills,
          isSelected: true,
        }, {
          icon: {
            component: IconFasterShipping,
            size: 16,
          },
          name: '加急服務',
          component: UrgentProcessing,
          isSelected: false,
        }, {
          icon: {
            name: 'md-calculator'
          },
          name: '試算運費',
          component: Calculator,
          isSelected: false,
        }, {
          icon: {
            name: 'md-lock',
          },
          name: '取貨鎖設定',
          component: UrgentProcessing,
          isSelected: false,
        }, {
          icon: {
            name: 'md-flag',
          },
          name: '收貨地址',
          component: UrgentProcessing,
          isSelected: false,
        }, {
          icon: {
            name: 'md-help-circle',
          },
          name: '常見問題',
          component: UrgentProcessing,
          isSelected: false,
        }, {
          icon: {
            name: 'md-settings',
          },
          name: '設定',
          component: Calculator,
          isSelected: false,
        },
      ]
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

  componentDidMount() {
    setTimeout(() => {
      this.props.openSideDrawer();
    }, 200);
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

  navigationItemClicked(itemData) {
    this.setState({
      navigationItems: this.state.navigationItems.map((item) => {
        item.isSelected = (item === itemData);

        return item;
      })
    });

    this.refs.navigator.replace({ index: 0, component: itemData.component });

    this.props.closeSideDrawer();
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
        content={
          <Menu
            navigationItems={this.state.navigationItems}
            onItemPress={this.navigationItemClicked.bind(this)}
          />
        }
        tapToClose={true}
        openDrawerOffset={56}
        onClose={() => { this.props.closeSideDrawer(); }}
        onOpenStart={this.fadeInOutOverlay.bind(this)}
        onCloseStart={this.fadeInOutOverlay.bind(this)}
      >
        <StatusBar barStyle='light-content' />
        <Navigator
          ref="navigator"
          style={styles.container}
          initialRoute={routes[0]}
          initialRouteStack={routes}
          navigationBar={
            (this.props.showNavigator &&
              <Navigator.NavigationBar style={{ flex: 1 }} />
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
  { openSideDrawer, closeSideDrawer }
)(Main);
