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
import SignIn from './SignIn';
import { Menu, Navigator } from '../Components';

import { openSideDrawer, closeSideDrawer } from '../Actions/sideDrawerActions';
import { checkUserSignedIn, userSignIn, userSignOut } from '../Actions/userActions';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  componentDidMount() {
    this.props.checkUserSignedIn();
  }

  componentWillReceiveProps(props) {
    if (!props.sideDrawerOpened === this.props.sideDrawerOpened === props.sideDrawerOpened) {
      if (!props.currentUser || this.props.currentUser !== props.currentUser) {
        if (props.currentUser) {
          setTimeout(() => {
            this.props.openSideDrawer();
          }, 200);
        } else {
          this.refs.navigator.push({
            index: 1,
            component: SignIn,
            transition: Navigator.SceneConfigs.FloatFromBottom,
          });
        }
      }
    }
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
        <TouchableOpacity
          style={{ position: 'absolute', top: 20, right: 30 }}
          onPress={async () => { this.props.userSignOut(); }}
        >
          <Text>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ position: 'absolute', top: 20, right: 80 }}
          onPress={async () => { this.props.userSignIn('calvin.peak', '12364362'); }}
        >
          <Text>SignIn</Text>
        </TouchableOpacity>
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
      currentUser: state.user.currentUser,
    };
  },
  { openSideDrawer, closeSideDrawer, checkUserSignedIn, userSignIn, userSignOut },
  null,
  {
    areStatePropsEqual: (prev, next) => {
      return !(prev.currentUser === next.currentUser === null) && prev === next;
    }
  },
)(Main);
